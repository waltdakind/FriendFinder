// ===============================================================================
// DEPENDENCIES
// We need to include the path package to get the correct file path for our html
// ===============================================================================
var path = require('path');

// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function(app){

    // HTML GET Requests
    // Below code handles when users "visit" a page. 
    // In each of the below cases the user is shown an HTML page of content
    // ---------------------------------------------------------------------------

    app.get('/survey', function(req, res){
        res.sendFile(path.join(__dirname + '/../public/survey.html'));
    });
    // not using this yet but leaving it here in case i want to add another route
    // app.get('/reserve', function(req, res){
    //     res.sendFile(path.join(__dirname + '/../public/reserve.html'));
    // });

    // If no matching route is found default to home
    app.use(function(req, res){
        res.sendFile(path.join(__dirname + '/../public/home.html'));
    });

}