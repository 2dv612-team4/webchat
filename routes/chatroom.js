'use strict';
const index = require('./index');
const express = require('express');
let hbs = require('hbs');
const router = express.Router();

/* GET chatroom page. */
router.get('/', function(req, res, next) {
  if(req.session.loggedIn) {
    hbs.registerPartial('user', req.session.loggedIn);
    res.render('chat', {layout: 'chat.hbs'});
  } else {
    res.redirect('/');
  }
});

module.exports = router;
