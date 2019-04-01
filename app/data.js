// app/routes.js
var Data = require('./models/client_data');
const browser = require('browser-detect');
module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/table', function(req, res) {
        console.log("get table");
        Data.find().lean().exec(function (err, result) {
            if (err) throw err;
            //console.log(result);
            res.send({"code": 200, "result": result});
        });
    });
    app.post('/collect', function(req, res){
        var newData = new Data();
        console.log("outside in");
        newData.resolution = req.body.resolution;
        newData.browserVersion = req.body.browserVersion;
        newData.browserVersion_useragent = browser(req.body.browserVersion_useragent).name;//req.body.browserVersion_useragent;
        newData.browsertype = req.body.browsertype;
        newData.loadtime = req.body.loadtime;  
        newData.addedTime = new Date();
        newData.sessionid = req.body.sessionid;
        newData.pagename = req.body.pagename;
        const result = browser(req.headers['user-agent']);        
        console.log( 'real is ' + newData.browserVersion_useragent);
        console.log(newData.sessionid);                
        newData.save(function (err) {
          if(err) {
            console.error('cant save!');
          }
        });

        
});
};

