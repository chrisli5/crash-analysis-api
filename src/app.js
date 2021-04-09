const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const { NODE_ENV } = require('./config/config');
const scraper = require('./scrape');

const app = express();

const morganOption = (NODE_ENV === 'production') ? 'tiny' : 'common';

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

const testSite = {
    link: 'https://www.ethercrash.io/stats',
    fields: [{name: 'totalWagered', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(4) > td:nth-child(3)'},
             {name: 'investorProfit', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(8) > td:nth-child(3)'},
             {name: 'totalGames', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(11) > td:nth-child(3)'},
             {name: 'totalBets', selector: 'body > div.row > div > div > div > table > tbody > tr:nth-child(12) > td:nth-child(3)'}]
}

scraper(testSite).then((value) => {
    console.log(value);
})


app.use(function errorHandler(error, req, res, next) {
    let response
    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error' } }
    } else {
        console.error(error)
        response = { message: error.message, error }
    }

    res.status(500).json(response)
})

module.exports = app;
