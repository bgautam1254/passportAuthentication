const express = require('express');
const router = express.Router();

// Passport
const passport = require('passport');

// bcrypt
// const bcrypt = require("bcryptjs");

// User model
const User = require('../models/User.js');

//Login page
// router.get('/login', (req, res) => res.send('Checking logging'));
router.get('/login', (req, res) => res.render('login.ejs'));

//Register page
// router.get('/register', (req, res) => res.send('Checking register'));
router.get('/register', (req, res) => res.render('register.ejs'));

// // Register Handle
// router.post('/register', (req, res) => {
//     console.log(req.body);
//     res.send('hello there');
// });

// Register Handle
router.post('/register', (req, res) => {
  console.log(req.body);
  const { name, email, password, password2 } = req.body;
  let errors = [];

  // check required field for error
  if (!name || !email || !password || !password2) {
    errors.push({ msg: 'Please fill all required fields\n' });
  }

  // checks for length of password
  if (password.length < 6) {
    errors.push({ msg: 'Password should be of atleast 6 characters\n' });
  }

  // checks if password match
  if (password != password2) {
    errors.push({ msg: 'Passwords do not match\n' });
  }

  // if name or email or passwords are entered then they are not cleared after an error, fields are not completely empty
  if (errors.length > 0) {
    res.render('register.ejs', {
      errors,
      name,
      email,
    });
  } else {
    // validating registration and checks if user exist or not
    User.findOne({ email: email }).then((user) => {
      if (user) {
        // user exists
        errors.push({ msg: 'Email is already Registered' });
        res.render('register', {
          errors,
          name,
          password,
        });
      } else {
        const newUser = new User({
          name,
          email,
          password,
        });

        // console.log(newUser);
        // res.send('Hello there registration is complete');

        // // save User
        // newUser.save().then(user => {
        //     res.redirect('/login');
        //   })

        // Hash Password
        const bcrypt = require('bcryptjs');
        bcrypt.genSalt(10, (err, salt) =>
          bcrypt.hash(newUser.password, salt, (err, hash) => {
            if (err) throw err;
            // Set password to hashed
            newUser.password = hash;
            // save User
            newUser
              .save()
              .then((user) => {
                req.flash(
                  'success_msg',
                  'You are now registered and can Log-in'
                );
                res.redirect('/users/login');
              })
              .catch((err) => console.log(err));
          })
        );
      }
    });
  }
});

// Login Handle
router.post('/login', (req, res, next) => {
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/users/login',
    failureFlash: true,
  })(req, res, next);

  // preventBack();
  // setTimeout("preventBack()", 0);
  // window.onunload = function () { null };

});


// function preventBack() {
//   window.history.forward();
// }

// const { ensureAuthenticated } = require('../config/auth.js');



// const ensureNtAuthenticated = (req, res, next) => {
//   if (req.ensureNtAuthenticated()) {
//     return next();
//   }
//   req.flash('error_msg', 'Please log in to view this resource');
//   res.redirect('/users/login');
// }


// Logout Handle
router.get('/logout', (req, res) => {





  // req.logOut;
  // req.session.loggedin = false;
  req.logout;

  // console.log(req.user);

  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');




});








// // Login Handle
// router.post('/login', (req, res, next) => {
//   passport.authenticate('local', {
//     successRedirect: '/dashboard',
//     failureRedirect: '/users/login',
//     failureFlash: true,
//   })(req, res, next);
// });


// // Logout Handle
// // DELETE /api/auth/logout
// router.delete('/logout', (req, res) => {
//   if (req.session) {
//     req.session.destroy(err => {
//       if (err) {
//         res.status(400).send('Unable to log out')
//       } else {
//         req.flash('success_msg', 'You are logged out');
//         res.redirect('/users/login');
//         console.log(req.user);
//       }
//     });
//   } else {
//     res.end()
//   }
// })
// router.get('/logout', (req, res, next) => {
//   res.render('logout.ejs', { name: "secretLogout" });
//   next();
// }
//   , (req, res) => {
//     req.flash('success_msg', 'You are logged out');
//     res.redirect('/users/login');
//   }

// );
// router.get('/logout', (req, res, next) => {
//   res.render('logout.ejs', { name: "secretLogout" })

//   // next();
// }),
// (req, res) => {
//   // req.session.destroy();
//   // req.session.loggedin = true;
//   // req.logOut;
//   // req.logout;

//   // res.send = { name: "secretLogout" };
//   req.flash('success_msg', 'You are logged out');
//   res.redirect('/users/login');
//   // console.log(req.user);

// });

// req.session.destroy;
// req.session.loggedin = false;
// req.logOut;
// req.logout;
// console.log(req.user);
// req.flash('success_msg', 'You are logged out');
// res.redirect('/users/login');



module.exports = router;
