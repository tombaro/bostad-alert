var rp = require('request-promise');

const url = 'https://bostad.stockholm.se/Lista/AllaAnnonser';

function filterData () {
    const options = {
        uri: url,
        json: true
    };

    return rp(options)
        .then(function (data) {
            return data.filter(data => data.Stadsdel === 'Högdalen' || data.Stadsdel === 'Bandhagen' || data.Stadsdel === 'Rågsved');
        })
        .catch(function (error) {
            console.log('failed');
            return error;
        });
}

module.exports = filterData;
