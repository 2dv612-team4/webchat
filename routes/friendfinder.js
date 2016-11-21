'use strict';
const index = require('./index');
const express = require('express');
let hbs = require('hbs');
const user = require('../model/DAL/userHandler.js');
const router = express.Router();

/* GET friendfinder page. */
router.get('/', function(req, res, next) {
  let usernames = [];
  if(req.session.loggedIn) {
    let promise = user.findAllUsers();
    promise.then(function(users) {
      users.forEach(function(user) {
        usernames.push(user.username);
      });
      hbs.registerPartial('usernames', usernames.toString());
      hbs.registerPartial('users', users);
      res.render('friendfinder', {layout: 'friendfinder.hbs'});
    });
  } else {
    res.redirect('/');
/**
 * Sends user friend request
 */
router.post('/:username', function(req, res) {
  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  const reciverUsername = req.params.username;
  const requesterUsername = req.session.loggedIn;
  co(function*(){
    const [ requesterUser, reciverUser ] = yield [
      userHandler.findWithUsername(requesterUsername),
      userHandler.findWithUsername(reciverUsername),
    ];
    const isFriendRequsetAlreadySent = reciverUser.friendrequests.find(id => 
      id.toString() === requesterUser._id.toString());
    if(isFriendRequsetAlreadySent){
      return res.sendStatus(304);
    }
    yield userHandler.addFriendRequest(reciverUser._id, requesterUser._id);
    res.sendStatus(200);
  })
  .catch((e) => console.log('error: ', e));
});

router.post('/', function(req, res) {
  const username = req.session.loggedIn;
  const usertofriend = req.body.usertofriend;

  console.log('username: ' + username);
  console.log('usertofriend: ' + usertofriend);

  // Add functionality to send a friend request here
});

router.get('/searchusers', function(req, res) {
  console.log('test');
  const usertofind = req.query.searchuser;
  console.log('searchusers: ' + usertofind);

  let promise = user.findWithUsername(usertofind);
  promise.then(function(user) {
    if(user) {
      console.log('user found: ' + user.username);
    } else {
      console.log('user not found: ' + usertofind);
    }
  })
  .catch(function(err){
    console.log('error when searching for user:', err);
  });

});


module.exports = router;
