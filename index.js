const http = require('http');
const puppeteer = require('puppeteer');
const { resolve } = require('path');

const CNET_URL = `https://www.cnet.com/`;

function scrapeForData() {
  /* the scraping result has to be obtained before server response, solution is Promise-resolve action */
  return new Promise(
    resolve => {
      /* immediately invoked function expression */
      var scrapeResult = (async () => {
        try {
          /* Initiate the Puppeteer browser */
          const browser = await puppeteer.launch();
          const page = await browser.newPage();

          /* Go to the mainpage and wait for it to load */
          await page.goto(CNET_URL, { waitUntil: 'networkidle0' });
          /* Run javascript inside of the page */
          var mainPageData = await page.evaluate(() => {
            var storiesNodeList = document.querySelectorAll('div[class="latestScrollItems"] > div[class="row item"] > .col-5 > .col-4 > h3 > a');
            var storiesArray = [];
            /* Iterate first 5 latest stories and save data in array */
            for (var i = 0; i < 5; i++) {
              storiesArray[i] = {
                newsHeader: storiesNodeList[i].innerText,
                category: storiesNodeList[i].href.replace("https://www.cnet.com/", "").split('/')[0],
                url: storiesNodeList[i].href,
              };
            }
            return storiesArray;
          });

          /*  variable to hold scraped data from subpages  */
          var subPageData = [];
          /* Iterate links to subpages of 5 latest stories */
          for (var i = 0; i < 5; i++) {
            try {
              await page.goto(mainPageData[i].url);
              console.log('Opened page:  ', mainPageData[i].url);
              subPageData[i] = await page.evaluate(() => {
                /* use devtools API to get data */
                /* TODO  : Handle video stories, handle images better*/
                try {
                  var shortSummary = document.querySelector('p[class="c-head_dek"]').innerText;
                } catch (err) {
                  var shortSummary = "";
                }
                try {
                  var tags = Array.from(document.querySelectorAll('div[class="row tagList desktop"] > a'), x => x.innerText);
                } catch (err) {
                  var tags = [""];
                }
                try {
                  var author = Array.from(document.querySelectorAll('div[class="c-assetAuthor_authors"] > span > .author'), x => x.innerText);
                } catch (err) {
                  var author = [""];
                }
                try {
                  var datePublished = document.querySelector('div[class="c-assetAuthor_date"] > time').innerText;
                } catch (err) {
                  var datePublished = "";
                }
                try {
                  var mainImageUrl = document.querySelector('article > div > figure[section="shortcodeImage"] > span > span > img').src;
                } catch (err) {
                  var mainImageUrl = "";
                }

                /* combine scraped data from subpages */
                subStoriesArray = {
                  shortSummary: shortSummary,
                  tags: tags.join(' | '),
                  author: author.join(' | '),
                  datePublished: datePublished,
                  mainImageUrl: mainImageUrl
                };

                return subStoriesArray;

              });
            } catch (err) {
              console.log(err);
            }
          }

          /* merge collected data from main and subpages into new javascript object */
          allPageData = {};
          for (var i = 0; i < 5; i++) {
            allPageData["article " + String(i + 1)] = {
              ...mainPageData[i],
              ...subPageData[i],
            }
          };

          await browser.close();
        }

        /* close browser if scraping unsuccessful */
        catch (err) {
          console.log(err);
          await browser.close();
        }

        /* final result*/
        return allPageData;
      })();  // end of immediately invoked function expression
      /* scrapeResult is obrained before other processes can advance*/
      resolve(scrapeResult);
    });
}

/* setup of the nodeJS server on localhost */
/* localhost at port 5060 */
const hostname = '127.0.0.1';
const port = 5060;

const server = http.createServer();
server.on('request', async (req, res) => {
  console.log("New request from localhost");
  console.log("Wait while scraping for data...");
  res.statusCode = 200;
  res.setHeader('Content-Type', 'aplication/json');
  const data = await scrapeForData();
  console.log(data);
  res.end(JSON.stringify(data));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});