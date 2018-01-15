var request = require('request');
var fs = require('fs');

const key = fs.readFileSync('./.env');

const send = function (data) {
    const sendurl = 'https://hooks.slack.com/services/' + key;
    const senddata = {
        text: data.Gatuadress + '\n' + 'Antal rum: ' + data.AntalRum + ' Hyra: ' + data.Hyra
    };

    console.log('try send' + senddata + ' to: ' + sendurl);

    // Send to Slack.
    // request(
    //     {
    //         method: 'post',
    //         body: senddata,
    //         json: true,
    //         url: sendurl
    //     }, function (error, response, body) {
    //         console.log(error);
    //         // console.log(response);
    //     }
    // );
};

module.exports = send;
