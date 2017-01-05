const express = require('express');
const router = express.Router();
const reports = require('../model/DAL/reportHandler.js');
const user = require('../model/DAL/userHandler.js');
const admin = 'admin';

/* GET admin page. */
router.get('/', function(req, res) {
  if(req.session.loggedIn == admin) {
    reports.findAll().then(function(reports){
      user.findAll().then(function(users){
        let userArr = [];
        users.forEach(function(user){
          if(user.banned){
            userArr.push(user);
          }
        });
        res.render('admin', {layout: 'admin.hbs', reports: reports, bans: userArr});
      });
    });
  } else {
    res.redirect('/');
  }
});

/* POST admin form. */
router.post('/banUser', function(req, res){
  const banUser = req.body.BanUser;

  user.setBannedStatus(banUser, true).then(function(){
    console.log('Successfully banned user!');
    reports.removeAllOfUser(banUser).then(function(){
      console.log('All reports from this user was removed!');
    });
  });
  res.redirect('/admin');
});

router.post('/removeReport', function(req, res){
  const removeReportId = req.body.RemoveReport;

  reports.removeThisReport(removeReportId).then(function(){
    console.log('Report was removed!');
  });
  res.redirect('/admin');
});

router.post('/removeAllReports', function(req, res){
  const removeAllReportsFromUser = req.body.RemoveAllReports;

  reports.removeAllOfUser(removeAllReportsFromUser).then(function(){
    console.log('All reports from this user was removed!');
  });
  res.redirect('/admin');
});

router.post('/unBanUser', function(req, res){
  const unBanUser = req.body.unBanUser;

  user.setBannedStatus(unBanUser, false).then(function(){
    console.log('Successfully unbanned user!');
  });
  res.redirect('/admin');
});

module.exports = router;
