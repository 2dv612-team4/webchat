'use strict';

let User = require(__dirname + '/Schemas/user.js');

function userHandler(){

}
let add = function(uname, pass){
    var newUser = new User({
        username: uname,
        password: pass
    });

    newUser.save(function(err){
        if(err) throw err;
        console.log('User saved');
    });
}

let findWithUsername = function(name){
    User.findOne({'username': name}, function(err, user){
        if(err) throw err;
        return user;
    });
}

module.exports = {
    add: add,
    findWithUsername: findWithUsername
};

