
const authenticate = (req, res, next) => {
  // For development purpose only
  if(process.argv.find(a => a === 'development')){
    req.session.loggedIn = 'user2';
    return next();
  }

  if(!req.session.loggedIn){
    return res.sendStatus(401);
  }
  next();
};

module.exports = authenticate;
