////////////////////// credit /////////////////////////////////////////////////////////////////////////
// http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.Wd8ffTLYVdh
// http://mherman.org/blog/2015/07/02/handling-user-authentication-with-the-mean-stack/#.Wd9nZzLYVdg
// http://devdactic.com/restful-api-user-authentication-2/
// https://scotch.io/tutorials/easy-node-authentication-setup-and-local
// https://github.com/nax3t/angular-express-passport-tutorial/blob/master/facebook.md
// https://github.com/brandonmcquarie/easy-node-authentication-angular
///////////////////////////////////////////////////////////////////////////////
var LocalStrategy   = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var GitHubStrategy = require('passport-github2').Strategy;
var configAuth = require('./authConfig.js');
var notVaild = require('./authValidator.js');
module.exports = function (app, passport, Account) {

passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

passport.deserializeUser(function (id, done) {
	Account.findById(id, function (err, user) {
// 		 console.log('deserializing user:',user);
		done(err, user);
	});
});

passport.use('local-signup', new LocalStrategy({
    // by default, local strategy uses username and password, we will override with email
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
},
function(req, email, password, done) {
    // console.log(req)
    var name = req.body.name;
    
    if (!email || !password){
        return done(null, { error: 'All fields are required!' });
    }
    else if ( email.length > 100 || name.length > 100 ){
        return done(null, { error: 'Values are too long!' });
    }
    else if ( notVaild.emailValidator(email) ){
        return done(null, { error: 'Please enter a valid email address!' });
    } 
    else if ( name && notVaild.nameValidator(name) ){
        return done(null, { error: 'Please enter a valid name!' });
    }
    else {
         email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
    }
    // asynchronous
    process.nextTick(function() {
        // if the user is not already logged in:
        if (!req.user) {
            Account.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err)
                    return done(err);

                console.log(user);
                // check to see if theres already a user with that email
                if (user) {
                    return done(null, { error: 'That email is already taken.' });
                } else {

                    // create the user
                    var newUser            = new Account();
                    newUser.local.name = name;    
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);

                    newUser.save(function(err) {
                        if (err)
                            throw err;

                        return done(null, newUser);
                    });
                }

            });
        // if the user is logged in but has no local account...
        } else if ( !req.user.local.email ) {
            // ...presumably they're trying to connect a local account
            var user            = req.user;
            user.local.name = name;
            user.local.email    = email;
            user.local.password = user.generateHash(password);
            user.save(function(err) {
                if (err)
                    throw err;
                return done(null, user);
            });
        } else {
            // user is logged in and already has a local account. Ignore signup. (You should log out before trying to create a new account, user!)
            return done(null, req.user);
        }

    });

}));

passport.use('local-login', new LocalStrategy(
	  function(email, password, done) {
        if (!email || !password){
            return done(null, { error: 'All fields are required!' });
        }
        else if ( email.length > 100 ){
            return done(null, { error: 'email value is too long!' });
        }
        else if (notVaild.emailValidator(email)){
            return done(null, { error: 'Please enter a valid email address!' });
        } else {
            email = email.toLowerCase(); // Use lower-case e-mails to avoid case-sensitive e-mail matching
        }
	     Account.findOne({
	      'local.email' :  email
	    }, function(err, user) {
	      // if there are any errors, return the error before anything else
           if (err)
               return done(err);

           // if no user is found, return the message
           if (!user)
               return done(null, false, {err:"Email not found!"});

           // if the user is found but the password is wrong
           if (!user.validPassword(password))
               return done(null, false, {err:"Oops! Wrong password."}); 

           // all is well, return successful user
           return done(null, user);
	    });
	  }
	));

passport.use(new GoogleStrategy({

        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        scope           : ['profile', 'email'],
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                Account.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        // if there is no user found with that id, create them
                        var newUser          = new Account();

                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                        !newUser.local && (newUser.local.name = profile.displayName);
                        (newUser.local && !newUser.local.name) && (newUser.local.name = profile.displayName);
                        // save user to the database
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            // if successful, return the new user
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session

                // update the current users facebook credentials
                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                // save user
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });

            }

        });

    }));

passport.use(new GitHubStrategy({

        clientID: configAuth.githubAuth.clientID,
		clientSecret: configAuth.githubAuth.clientSecret,
		callbackURL: configAuth.githubAuth.callbackURL,
		scope: ['user:email'],
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)

    },
    function(req, token, refreshToken, profile, done) {

        // asynchronous
        process.nextTick(function() {

            // check if the user is already logged in
            if (!req.user) {

                Account.findOne({ 'github.id': profile.id }, function(err, user) {
                    if (err)
                        return done(err);

                    if (user) {

                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.github.token) {
                            user.github.token = token;
                            user.github.name  = profile.displayName;
                            user.github.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                    
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }

                        return done(null, user);
                    } else {
                        var newUser          = new Account();

                        newUser.github.id    = profile.id;
                        newUser.github.token = token;
                        newUser.github.name  = profile.displayName;
                        newUser.github.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email
                        !newUser.local && (newUser.local.name = profile.displayName);
                        (newUser.local && !newUser.local.name) && (newUser.local.name = profile.displayName);
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });

            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session
                
                // update the current users facebook credentials
                user.github.id    = profile.id;
                user.github.token = token;
                user.github.name  = profile.displayName;
                user.github.email = (profile.emails[0].value || '').toLowerCase(); // pull the first email

                user.save(function(err) {
                    if (err)
                        throw err;
                    
                    return done(null, user);
                });

            }

        });

    }));
};

// passport.use('local-change-password', new LocalStrategy({
//     // by default, local strategy uses username and password, we will override with email
//     usernameField : 'email',
//     passwordField : 'password',
//     passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
// },
// 	  function(id,email, oldPassword, password, done) {
// 	      console.log('local-change-password');
// 	     Account.findOne({
// 	      '_id' :  id
// 	    }, function(err, user) {
// 	      // if there are any errors, return the error before anything else
//             console.log('local-change-password');
//           if (err)
//               return done(err);

//           // if no user is found, return the message
//           if (!user)
//               return done(null, false, {err:"User not found!"});

//           // if the user is found but the password is wrong
//           if (!user.validPassword(oldPassword))
//               return done(null, false, {err:"Oops! Wrong password."}); 
           
//             Account.update({'_id': id},{
//                 	$set: { 'local.password': user.generateHash(password)}
//                                 },function (err,data) {
//                                 if (err) throw err;
//                                 console.log("Password Change Successfull");
//                                 // all is well, return successful user
//                                 return done(null, user);
//                         });
// 	    });
// 	  }
// ));	
