'use strict';
const index = require('./index');
const express = require('express');
let hbs = require('hbs');
const user = require('../model/DAL/userHandler.js');
const userHandler = require('../model/DAL/userHandler.js');
const co = require('co');
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
// TODO: fix code duplication

/**
 * Sends user friend request
 */
router.post('/:username', function(req, res) {
router.post('sendrequest/:username', function(req, res) {
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

/**
 * Removes friend requests
 */
router.post('/removerequest/:username', function(req, res){
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
    
    yield userHandler.removeFriendRequest(reciverUser._id, requesterUser._id);
    res.sendStatus(200);
  })
  .catch(() => res.sendStatus(500));
});

/** 
 * Get all user friends
*/
router.get('/', function(req, res){
  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  const username = req.session.loggedIn;
  userHandler.findFriendsWithUsername(username)
    .then((user) => res.json(user.friends))
    .catch((e) => res.sendStatus(500));
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
