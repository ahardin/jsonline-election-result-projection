// var fs = require('fs');
// var obj = JSON.parse(fs.readFileSync('results.json'));
var req = require('request');

function process() {
    let addr = 'https://projects.jsonline.com/topics/election/2019/4/2/data/county-results.json';

    req.get(addr, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            let obj = JSON.parse(body);

            let projection = 0;

            for (var item in obj.county_results) {

                let lisa = 0;
                let brian = 0;

                obj.county_results[item]['supreme-court'].candidates.forEach(element => {
                    if (element.name === 'Lisa Neubauer') {
                        lisa = element.votes;
                    } else {
                        brian = element.votes;
                    }
                });

                let diff = brian - lisa;

                let percentIn = obj.county_results[item]['supreme-court'].precinctsReporting / obj.county_results[item]['supreme-court'].precinctsTotal;

                if (percentIn > 0) {
                    projection += diff / percentIn;
                }
            }

            console.log(projection);
        } else {
            console.log('error');
            console.log(error);
        }
    });
}

process();