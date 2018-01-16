var rp = require('request-promise');
var fs = require('fs');

const key = fs.readFileSync('./.env');
const bostadUrl = 'https://bostad.stockholm.se';

var send = {
    getSendData: function (bostader) {
        return {
            url: 'https://hooks.slack.com/services/' + key,
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

module.exports = send;
