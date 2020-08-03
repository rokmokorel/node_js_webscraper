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
        for (var i = 0; i < 2; i++) {
            try {
                await page.goto(mainPageData[i].url);
                console.log('Opened page:  ', mainPageData[i].url);
                subPageData[i] = await page.evaluate(() => {
                    var subStoriesArray = [];
                    /* use devtools API to get data */
                    var shortSummary = document.querySelector('p[class="c-head_dek"]');
                    var tags = Array.from(document.querySelectorAll('div[class="row tagList desktop"] > a'), x => x.innerText);
                    var author = Array.from(document.querySelectorAll('div[class="c-assetAuthor_authors"] > span > .author'), x => x.innerText);
                    var datePublished = document.querySelector('div[class="c-assetAuthor_date"] > time');
                    var mainImageUrl = document.querySelector('article[id="article-body"] > div[class="col-7 article-main-body row "] > figure[class="image image-large pull-none hasCaption shortcode"] > .imageContainer > span > img');
                    /* save scraped data from subpages */
                    
                    subStoriesArray[i] = {
                        shortSummary: shortSummary.innerText,
                        tags: tags.join(' | '),
                        author: author.join(' | '),
                    };

                    return subStoriesArray;
                
                });
            } catch (err) {
                console.log(err);
            }
        }

        /* Log the results */
        // console.log(mainPageData);
        console.log(subPageData);
        await browser.close();

    }
    catch (err) {
        console.log(err);
        await browser.close();
    }

})();