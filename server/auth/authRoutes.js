//http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.Wd8ffTLYVdh
//http://mherman.org/blog/2015/07/02/handling-user-authentication-with-the-mean-stack/#.Wd9nZzLYVdg
//http://devdactic.com/restful-api-user-authentication-2/
//https://scotch.io/tutorials/easy-node-authentication-setup-and-local
//https://github.com/nax3t/angular-express-passport-tutorial/blob/master/facebook.md
//https://github.com/brandonmcquarie/easy-node-authentication-angular
module.exports = function (app, passport, Account) {

function isLoggedIn (req, res, next) {
		if (req.isAuthenticated()) {
		  //console.log(req.isAuthenticated());
			return next();
		} else {
			res.redirect('/');
		}
	}
	
app.post('/register', function(req, res, next) {
    console.log('register');
    console.log(req.body.email);
    if (!req.body.email || !req.body.password || !req.body.name) {
        return res.status(400).json({ err: 'All fields are required' });
    }
    passport.authenticate('local-signup', function(err, user, info) {
        if (err) { 
            return res.status(500).json({err: err});
        }
        if (user.error) {
            return res.status(401).json({ err: user.error });
        }
        req.logIn(user, function(err) {
            if (err) {
                return res.status(500).json({err:err});
            }
            console.log('Registration successful!');
            console.log(user);
            return res.status(200).json({status: 'Registration successful!'}); 
        });
    })(req, res);
});

app.put('/login', function(req, res, next) {
  passport.authenticate('local-login', function(err, myUser, info) {
    if (err) {
      return next(err);
    }
    
    if (!myUser) {
      // console.log(info)
      return res.status(401).json({
        err: info
      });
    }
    req.logIn(myUser, function(err) {
      if (err) {
        return res.status(500).json({
          err: err
        });
      }
      console.log(myUser);
      res.status(200).json({
        status: 'Login successful!',
        user: myUser
      });
    });
  })(req, res, next);
});

app.get('/logout', function(req, res) {
  req.logout();
  res.status(200).json({
    status: 'Bye!'
  });
});

app.get('/status', function(req, res) {
  // res.header('Access-Control-Allow-Credentials', true);
  if (!req.isAuthenticated()) {
    return res.status(200).json({
      isLogedin: false,
      user:null
    });
    // return res.json(req.user);
  }
  res.status(200).json({
    isLogedin: true,
    user: req.user
  });
  // console.log("ok");
  // res.redirect('/');
});

app.put('/auth/change-password',isLoggedIn, function(req, res, next) {
    // console.log('change-password');
    // console.log(req.body);
    var user = req.user;
    if (!req.body.oldPassword || !req.body.password) {
        return res.status(400).json({ err: 'Old Password and Password are required' });
    }
 // if no user is found, return the message
   if (!user)
        return res.status(401).json({ err: "User not found!" });
   // if the user is found but the password is wrong
   if (!user.validPassword(req.body.oldPassword))
        return res.status(401).json({ err: "Oops! Wrong old password." });
   
    user.local.password = user.generateHash(req.body.password);
    user.save(function(err) {
        if (err) throw err;
        console.log("Password Changed Successfully");
        return res.status(200).json({status: 'Password Changed successfully!'}); 
    });
});

app.put('/auth/change-profile',isLoggedIn, function(req, res, next) {
    // console.log('change-password');
    // console.log(req.body);
    var user = req.user;
    // if (!req.body.profilePicture) {
    //     return res.status(400).json({ err: 'Profile Picture Url are required' });
    // }
    if (req.body.name && req.body.name.length > 100){
        return res.status(500).json({ err: "Value are too long!" });
    }
    if (!user){
        return res.status(401).json({ err: "User not found!" });
    }
    if (req.body.name){
      user.local.name = req.body.name;
    }
    user.local.profilePicture = req.body.profilePicture;
    user.save(function(err) {
        if (err) throw err;
        console.log("Profile Updated successfully!");
        return res.status(200).json({status: 'Profile Updated successfully!'}); 
    });
});



app.get('/ping', function(req, res){
    res.status(200).send("pong!");
});


/////////////////// Social login///////////////////////////////////
app.get('/auth/github',
		passport.authenticate('github'));
   
// 	app.get('/auth/github/callback',
// 		passport.authenticate('github', {
// 			successRedirect: '/',
// 			failureRedirect: '/login'
// 		}));

app.get('/auth/github/callback',function(req, res,next) {
            // res.header('Access-Control-Allow-Credentials', true);
            passport.authenticate('github', function(err, user, info) {
                    if (err){
                      console.log(err);
                // return res.status(500).json({ err: err.message });
                return  res.redirect('/');
            }
            console.log('github/callback')
            // res.status(200).json({
            //   status: 'Login successful!',
            //   name: user.github.name,
            //   id:   user.github.id,
            //   email: user.github.email
            // });
            req.logIn(user, function(err) {
              if (err) {
                return  res.redirect('/loginfailed');
              }
              console.log(user);
              res.redirect('/');
            });
            
    })(req, res, next);
});


app.get('/auth/google',
		passport.authenticate('google'));
    
app.get('/auth/google/callback',function(req, res,next) {
            // res.header('Access-Control-Allow-Credentials', true);
            passport.authenticate('google', function(err, user, info) {
              if (err){
                console.log(err);
                return  res.redirect('/');
              }
            req.logIn(user, function(err) {
              if (err) {
                return  res.redirect('/loginfailed');
              }
              console.log(user);
              res.redirect('/');
            });
            
    })(req, res, next);
});


app.get('/connect/github',
		passport.authorize('github'));
    

app.get('/connect/github/callback',function(req, res,next) {
            // res.header('Access-Control-Allow-Credentials', true);
            passport.authorize('github', function(err, user, info) {
                    if (err){
                      console.log(err);
                // return res.status(500).json({ err: err.message });
                return  res.redirect('/');
            }
            req.logIn(user, function(err) {
              if (err) {
                return  res.redirect('/loginfailed');
              }
              console.log(user);
              res.redirect('/profile');
            });
            
    })(req, res, next);
});

app.get('/connect/google',
		passport.authorize('google'));
    
app.get('/connect/google/callback',function(req, res,next) {
            // res.header('Access-Control-Allow-Credentials', true);
            passport.authorize('google', function(err, user, info) {
              if (err){
                console.log(err);
                return  res.redirect('/');
              }
            req.logIn(user, function(err) {
              if (err) {
                return  res.redirect('/loginfailed');
              }
              console.log(user);
              res.redirect('/');
            });
            
    })(req, res, next);
});

app.get('/unlink/local', function(req, res) {
        var user            = req.user;
        user.local.email    = undefined;
        user.local.password = undefined;
        user.save(function(err) {
            if (err) throw err;
            // res.redirect('/profile');
            res.status(200).json({status: 'Unlink successful!'}); 
        });
    });

app.get('/unlink/google', function(req, res) {
        var user          = req.user;
        user.google.token = undefined;
        user.save(function(err) {
            if (err) throw err;
            // res.redirect('/profile');
            res.status(200).json({status: 'Unlink successful!'}); 
        });
    });
app.get('/unlink/github', function(req, res) {
        var user          = req.user;
        user.github.token = undefined;
        user.save(function(err) {
            if (err) throw err;
            // res.redirect('/profile');
            res.status(200).json({status: 'Unlink successful!'}); 
        });
    });

app.get("/loginfailed", function (request, response) {
  response.sendFile(process.cwd() + '/client/loginFailed.html');
});


};