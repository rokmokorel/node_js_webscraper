const puppeteer = require('puppeteer');
const CNET_URL = `https://www.cnet.com/`;


(async () => {
    try {
        /* Initiate the Puppeteer browser */
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        /* Go to the webpage and wait for it to load */
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
        /* Iterate links to 5 latest stories and collect data from subpages */
        var subPageData = [];
        // TODO : increase the number of iterations to the number of stories
        for (var i = 0; i < 5; i++) {
            try {
                await page.goto(mainPageData[i].url);
                console.log('Opened page:  ', mainPageData[i].url);
                subPageData[i] = await page.evaluate(() => {
                    /* use devtools API to get data */
                    /* TODO  : Handle video stories, handle */
                    try {
                        var shortSummary = document.querySelector('p[class="c-head_dek"]').innerText;
                        var tags = Array.from(document.querySelectorAll('div[class="row tagList desktop"] > a'), x => x.innerText);
                        var author = Array.from(document.querySelectorAll('div[class="c-assetAuthor_authors"] > span > .author'), x => x.innerText);
                        var datePublished = document.querySelector('div[class="c-assetAuthor_date"] > time').innerText;
                        var mainImageUrl = document.querySelector('article > div > figure[section="shortcodeImage"] > span > span > img').src;
                    } catch (TypeError) {
                        var shortSummary = "";
                        var tags = [""];
                        var author = [""];
                        var datePublished = "";
                        var mainImageUrl = "";
                    }

                    /* save scraped data from subpages */
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
        /* merge collected data from main and subsites into one array */
        data = [];
        for (var i = 0; i < 5; i++) {
            data[i] = {
              ...mainPageData[i],
              ...subPageData[i],
          }
        };

        /* Log the results */
        // console.log(mainPageData);
        // console.log(subPageData);
        console.log(data);
        await browser.close();

    }
    catch (err) {
        console.log(err);
        await browser.close();
    }

})();