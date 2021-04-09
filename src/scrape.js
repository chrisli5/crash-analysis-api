const puppeteer = require('puppeteer');

async function scrape(obj) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(obj.link);

    const result = await page.evaluate((obj) => {
        let values = {};

        for(element of obj.fields) {
            values[element.name] = document.querySelector(element.selector).innerText;
        }

        return values;

    }, obj);

    browser.close();
    return result;
}

module.exports = scrape;
