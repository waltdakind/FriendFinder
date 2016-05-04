// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources. 
// This data source holds the array of data in the friends file
// ===============================================================================
var matchesArray         = require('../data/matches.js');
var friendData         = require('../data/friends.js');
var path             = require('path');
var currentBestChoice= [JSON.stringify(matchesArray[0])];
//loops backwards through match array setting best match on lowest difference
var findBestMatch = function(){
    for(i =  matchesArray.length -1; i >= 1; i--){
        if(matchesArray[i].totalDifference == i){
            currentBestChoice = JSON.stringify(matchesArray[i]);
        }
    }

};


// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

    // API GET Requests
    // Below code handles when users "visit" a page.
    // In each of the below cases when a user visits a link
    // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
    // ---------------------------------------------------------------------------

    app.get('/api/friends', function(req, res){
        res.json(friendData);
    });

    app.get('/api/matches', function(req, res){
        res.json(matchesArray);
    });
    // API POST Requests
    // Below code handles when a user submits a form and thus submits data to the server.
    // In each of the below cases, when a user submits form data (a JSON object)
    // ...the JSON is pushed to the appropriate Javascript array
    // (ex. User fills out a reservation request... this data is then sent to the server...
    // Then the server saves the data to the tableData array)
    // ---------------------------------------------------------------------------

    app.post('/api/friends', function(req, res) {


        // pushing friend data to the array in friends.js

        friendData.push(req.body);
        res.json(true); // KEY LINE
        var lastAddedFriend = friendData[friendData.length - 1];

        // test if this is the same result
        //       var altLastAdded = friendData.slice(-1)[0]

//console.log(JSON.stringify(lastAddedFriend) + ' ' + JSON.stringify(altLastAdded));
        //find the closest match
        for (var i = 0; i < friendData.length - 1; i++) {
            for (var j = 0; j < 10; j++) {
                var comparator = Math.abs(lastAddedFriend.scores[j] - friendData[i].scores[j]);
                totalDifference = +comparator;

                //  console.log(comparator);
                if (j == 9) {
                    matchesArray[matchesArray.length] = {
                        'index': i,
                        'totalDifference': totalDifference,
                        'name': friendData[i].name,
                        'photo': friendData[i].photo
                    };
                    if(matchesArray[i].totalDifference < currentBestChoice){
                        currentBestChoice = matchesArray[i].totalDifference;

                        console.log(currentBestChoice);
                    }
                    console.log('index: ' + i, 'totalDifference: ' + totalDifference, 'name: ' + friendData[i].name);
                }

            }
        }
        findBestMatch();
        console.log(currentBestChoice);
    })
    };

