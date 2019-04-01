// app/routes.js
var Data = require('./models/error_data');
module.exports = function(app) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/table_error', function(req, res) {
        console.log("get table");
        Data.find().lean().exec(function (err, result) {
            if (err) throw err;
            //console.log("errors are "+result);
            res.send({"code": 200, "result": result});
        });
    });
    app.post('/collect_error', function(req, res){
        var newData = new Data();
        console.log("outside in");
        newData.jsError = req.body.jsError;
        newData.addedTime = new Date();
        newData.sessionid = req.body.sessionid;
        newData.save(function (err) {
        if(err) {
            console.error('cant save!');
        }
    });

        
});
};

