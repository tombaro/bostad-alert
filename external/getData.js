var request = require('request');

const url = 'https://bostad.stockholm.se/Lista/AllaAnnonser';

const data = function () {
    request.get(url, function (error, response, body) {
        if (error) {
            res.render('index', {title: 'Failed'});
        }
        // JSON.parse(body)
        //     .filter(c => c.Stadsdel === 'Högdalen' || c.Stadsdel === 'Bandhagen' || c.Stadsdel === 'Rågsved');
        // .map(d => notifyExternal(c));
    
        lodashTake(lodashFilter(JSON.parse(body), function(match) {
            return match.Stadsdel === 'Högdalen' || match.Stadsdel === 'Bandhagen' || match.Stadsdel === 'Rågsved';
          }), 20);
    }
}

module.exports = data;