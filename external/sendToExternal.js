var rp = require('request-promise');

const Search = require('../models/search');
const Rental = require('../models/rental');

const bostadUrl = 'https://bostad.stockholm.se';

// Get data to send.
// For each saved search, get proper data and send.

async function sendToAll () {
    let searches = await getSearches();
    for (let i = 0; i < searches.length; i++) {
        sendRentals(searches[i]);
    }
}

async function sendRentals (searchModel) {
    // Match search to list.
    let rentals = await Rental
        .find({ Stadsdel: new RegExp(searchModel.Stadsdelar[0], 'i') })
        .exec();

    sendToSlack(rentals);
}

async function sendToSlack (rentals) {
    let sendbody = await getSendData(rentals);
    let sendurl = 'https://hooks.slack.com/services/' + process.env.slackkey;

    console.log({sendbody, sendurl});

    // return rp(
    //     {
    //         method: 'post',
    //         body: sendbody,
    //         json: true,
    //         uri: sendurl
    //     }, function (error, response, body) {
    //         if (error) {
    //             console.log(error);
    //         }
    //     }
    // );
}

async function getSearches () {
    return Search.find({})
        .exec();
}

async function getSendData (rentals) {
    let txt = '';
    for (let i = 0; i < rentals.length; i++) {
        txt += rentals[i].Gatuadress + '\n' + 'Antal rum: ' + rentals[i].AntalRum + ' Hyra: ' + rentals[i].Hyra + '\nLänk:<' + bostadUrl + rentals[i].Url + '>\n';
    }

    return txt;
}

module.exports = sendToAll;
