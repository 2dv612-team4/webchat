'use strict';

const User = require(__dirname + '/Schemas/user.js');

const add = function(uname, pass){
    var newUser = new User({
        username: uname,
        password: pass
    });

    newUser.save(function(err){
        if(err) throw err;
        console.log('User saved');
    });
}

const findWithUsername = function(name){
    return new Promise((resolve, reject) => {
        var test = User.findOne({'username': name}, function(err, user){
            if(err)
            {
                return reject(err);
            }
            return resolve(user);
        });
    })
}

module.exports = {
    add: add,
    findWithUsername: findWithUsername
};

