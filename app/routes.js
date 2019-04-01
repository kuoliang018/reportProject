// app/routes.js
var User            = require('../app/models/user');
var api_key = 'a22efaddb7c53409d15c2eeababe5790-de7062c6-b77fa644';
const mailgun = require("mailgun-js");
const DOMAIN = 'sandbox161ecddb6bb1491f95f0817a6b345502.mailgun.org';
var path = require("path");
var filepath = path.join(__dirname, '/uploads/chart-5c8ae4454dd45.pdf');
const mg = mailgun({apiKey: api_key, domain: DOMAIN});


module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index.ejs'); // load the index.ejs file
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login.ejs', { message: req.flash('loginMessage') }); 
    });
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/login', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    // process the login form
    // app.post('/login', do all our passport stuff here);

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    app.get('/signup', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('signup.ejs', { message: req.flash('signupMessage') });
    });
    // process the signup form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect : '/profile', // redirect to the secure profile section
        failureRedirect : '/signup', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.post('/createuser', passport.authenticate('local-signup', {
        successRedirect : '/admin_profile', // redirect to the secure profile section
        failureRedirect : '/admin_profile', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));
    app.post('/upload',function(req,res){
  console.log(req.files);
  if(req.files.upfile){
    var file = req.files.upfile,
      name = file.name,
      type = file.mimetype;
      var recipient = req.body.sendEmail;
      var textM = req.body.msg;
      var subject = req.body.subject;
    var uploadpath = __dirname + '/uploads/' + name;
    file.mv(uploadpath,function(err){
      if(err){
        console.log("File Upload Failed",name,err);
        res.send("Error Occured!")
      }
      else {
      const data = {
	from: 'a.l.k.a@163.com',
	to: recipient,
	subject: subject,
	text: textM,
  attachment: uploadpath
};
        console.log("File Uploaded",name);
                mg.messages().send(data, function (error, body) {
	console.log(body);
});
console.log("send");
        res.send('Done! Uploading files')
      }
    });
  }
  else {
    res.send("No File selected !");
    res.end();
  };
})
    app.post('/delete', function(req, res) {
        console.log("deleye");
        
        User.deleteOne({ 'local.username': req.body.usernameDel }, function (err) {
          if (err) return handleError(err);
          // deleted at most one tank document
        });
        User.find().lean().exec(function (err, result) {
            if (err) throw err;
            console.log("users are "+result);
            res.render('admin_profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            userArray : result,
            message: req.flash('signupMessage')
            });
        });
    });
    app.post('/avail', function(req, res) {
        console.log("changing access");
        
        User.findOne({'local.username': req.body.usernameAcc}, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                throw err;
            if  (user) {
                if(req.body.browserChart == 'browserChart'){
                  user.local.browserChart = true;
                }else{
                  user.local.browserChart = false;
                }
                if(req.body.deviceChart == 'deviceChart'){
                  user.local.deviceChart = true;
                }else{
                  user.local.deviceChart = false;
                }
                if(req.body.resolutionChart == 'resolutionChart'){
                  user.local.resolutionChart = true;
                }else{
                  user.local.resolutionChart = false;
                }
                if(req.body.performanceChart == 'performanceChart'){
                  user.local.performanceChart = true;
                }else{
                  user.local.performanceChart = false;
                }
                if(req.body.errorChart == 'errorChart'){
                  user.local.errorChart = true;
                }else{
                  user.local.errorChart = false;
                }
                if(req.body.userBehaviorChart == 'userBehaviorChart'){
                  user.local.userBehaviorChart = true;
                }else{
                  user.local.userBehaviorChart = false;
                }                                
                
                
                
                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                });
            }
        });
        User.find().lean().exec(function (err, result) {
            if (err) throw err;
            console.log("users are "+result);
            res.render('admin_profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            userArray : result,
            message: req.flash('signupMessage')
            });
        });
    });
    app.get('/admin_profile', isLoggedIn, function(req, res) {
        console.log("getuser");
        User.find().lean().exec(function (err, result) {
            if (err) throw err;
            console.log("users are "+result);
            res.render('admin_profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            userArray : result,
            message: req.flash('signupMessage')
            });
        });
        
    });
    app.post('/update',function(req, res) {
        console.log("updating user");
        /*var query = {'local.username': req.body.old_username};
        console.log("old = "+req.body.old_username);        
        var new_user = new User();
        User.findOneAndUpdate(query, {$set:{'local.username': req.body.new_username, 'local.email': req.body.email, 'local.password': new_user.generateHash(req.body.password),}}, {upsert:true}, function(err, doc){
            if (err) throw err;
            User.find().lean().exec(function (err, result) {
            if (err) throw err;
            console.log("users are "+result);
            res.render('admin_profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            userArray : result,
            message: req.flash('signupMessage')
            });
        });
        });*/
        User.findOne({'local.username': req.body.old_username}, function(err, user) {
            // if there are any errors, return the error before anything else
            if (err)
                throw err;
            if  (user) {

                user.local.username = req.body.new_username;
                user.local.email    = req.body.email;
                user.local.password = user.generateHash(req.body.password);
                user.local.admin = false;
                // save the user
                user.save(function(err) {
                    if (err)
                        throw err;
                });
            }
        });
        User.find().lean().exec(function (err, result) {
            if (err) throw err;
            console.log("users are "+result);
            res.render('admin_profile.ejs', {
            user : req.user, // get the user out of session and pass to template
            userArray : result,
            message: req.flash('signupMessage')
            });
        });
        //User.update({'local.username': req.body.old_username},{$set:{'local.username': req.body.new_username, 'local.email': req.body.email, 'local.password': req.body.password,}}, );
        
    });
    // process the signup form
    // app.post('/signup', do all our passport stuff here);

    // =====================================
    // PROFILE SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/profile', isLoggedIn, function(req, res) {
        console.log("getuser");
        User.find().lean().exec(function (err, result) {
            if (err) throw err;
            console.log("users are " + result);
            
            if(req.user.local.admin == true){
              res.render('admin_profile.ejs', {
                user : req.user, // get the user out of session and pass to template
                userArray : result,
                message: req.flash('signupMessage')
              });
            }else{
              res.render('profile.ejs', {
                user : req.user, // get the user out of session and pass to template
                userArray : result,
                browserChart : req.user.local.browserChart,
                deviceChart : req.user.local.deviceChart,
                resolutionChart : req.user.local.resolutionChart,
                performanceChart : req.user.local.performanceChart,
                errorChart : req.user.local.errorChart,
                userBehaviorChart : req.user.local.userBehaviorChart,                
                message: req.flash('signupMessage')
              });
            }
            
        });
        
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}