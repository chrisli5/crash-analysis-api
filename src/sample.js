let scrape = async (obj) => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto('https://www.ethercrash.io/stats');

    const result = await page.evaluate(() => {
        let totalWagered = document.querySelector('body > div.row > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)').innerText;
        let investorProfit = document.querySelector('body > div.row > div > div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)').innerText;
        let totalGames = document.querySelector('body > div.row > div > div > div > table > tbody > tr:nth-child(11) > td:nth-child(3)').innerText;
        let totalBets = document.querySelector('body > div.row > div > div > div > table > tbody > tr:nth-child(12) > td:nth-child(3)').innerText;

        return { totalWagered, investorProfit, totalGames, totalBets };
    });

    browser.close();
    return result;
}

scrape().then((value) => {
    console.log(value);
})

const testSite = {
    link: 'https://www.ethercrash.io/stats',
    fields: [{name: 'totalWagered', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)'},
             {name: 'investorProfit', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)'},
             {name: 'totalGames', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(11) > td:nth-child(3)'},
             {name: 'totalBets', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(12) > td:nth-child(3)'}]
}