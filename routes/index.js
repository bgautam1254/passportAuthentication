const express = require('express');
const router = express.Router();

// Home Page
// router.get('/', (req, res) => res.send('Welcome to Home Screen hehehe'));
router.get('/', (req, res) => res.render('welcome.ejs'));

// // Dashboard
// router.get('/dashboard',
//     (req, res, next) => {
//         // console.log(req.user);
//         console.log(req.name);
//         next();
//     },
//     // (req, res, next) => {
//     //     console.log(req.logoutname);
//     //     if (req.logoutname == "secretLogout") {
//     //         req.flash('error_msg', 'Please log in to view this resource');
//     //         res.redirect('/users/login');
//     //     }
//     //     next();
//     // },
//     (req, res) => res.render('dashboard.ejs', { name: req.user.name }));
// // res.render('dashboard.ejs'));

// // Dashboard
// router.get('/dashboard', ensureAuthenticated, (req, res) => res.render('dashboard.ejs',));


const { ensureAuthenticated } = require('../config/auth.js');
// const ensureAuthenticated = require('../config/auth.js');

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
    res.render('dashboard.ejs', { name: req.user.name }));


// const ensureNtAuthenticated = require('../config/auth.js');
// // Dashboard 
// router.get('/dashboard', ensureNtAuthenticated, (req, res) =>
//     res.render('dashboard.ejs', { name: req.user.name }));

// // Dashboard 
// router.get('/dashboard',
//     //     (req, res, next) => {
//     //     console.log(req.user);
//     //     if (!req.user.) {
//     //         res.redirect('/login'); // not logged-in
//     //         return;
//     //     }
//     //     next();
//     // },
//     (req, res) =>
//         res.render('dashboard.ejs', { name: req.user.name }));



module.exports = router;  