'use strict';
const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('register', {layout: 'register.hbs'});
});

module.exports = router;
