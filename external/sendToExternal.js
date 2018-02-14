var rp = require('request-promise');

const Search = require('../models/search');

const bostadUrl = 'https://bostad.stockholm.se';

// Get data to send.
// For each saved search, get proper data and send.

var send = {
    getSendData: function (bostader) {
        return {
            url: 'https://hooks.slack.com/services/' + process.env.slackkey,
            text: bostader.Gatuadress + '\n' + 'Antal rum: ' + bostader.AntalRum + ' Hyra: ' + bostader.Hyra + '\nLänk:<' + bostadUrl + bostader.Url + '>'
        };
    },
    sendToSlack: function (data) {
        let txt = '';
        for (let index = 0; index < data.length; index++) {
            txt += data[index].text;
            txt += '\n';
        }
        let sendbody = {text: txt};
        let sendurl = data[0].url;
        console.log({sendbody, sendurl});

        // Send to Slack.
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
};

async function sendToAll () {
    let searches = await getSearches();
    for (let i = 0; i < searches.length; i++) {
        console.log(searches[i]);
    }
}

async function getSearches () {
    return Search.find({})
        .exec();
}

module.exports = send;
