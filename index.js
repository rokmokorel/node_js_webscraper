const puppeteer = require('puppeteer');
const CNET_URL = `https://www.cnet.com/`;


(async () => {
    /* Initiate the Puppeteer browser */
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    /* Go to the IMDB Movie page and wait for it to load */
    await page.goto(CNET_URL, { waitUntil: 'networkidle0' });

    /* Run javascript inside of the page */
    var news = await page.evaluate(() => {
        var titleNodeList = document.querySelectorAll('div[class="latestScrollItems"] > div[class="row item"] > .col-5 > .col-4 > h3 > a');
        var titleLinkArray = [];
        for (var i = 0; i < 5; i++) {
          titleLinkArray[i] = {
            title: titleNodeList[i].innerText
          };
        }
        return titleLinkArray;
      });

    /* Outputting what we scraped */
    console.log(news);

    await browser.close();
})();