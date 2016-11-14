'use strict';

const Message = require(__dirname + '/Schemas/message.js');

const add = function(uID, rID, message){
    var newMessage = new Message({
        userID: uID,
        roomID: rID,
        message: message,
        timestamp: new Date()
    });

    newMessage.save(function(err){
        if(err) throw err;
        console.log('message sent');
    });
}

const findMessagesByRoom = function(rID){
    return new Promise((resolve, reject) => {
        var test = Message.find({'roomID': rID}, function(err, messages){
            if(err)
            {
                return reject(err);
            }
            return resolve(messages);
        });
    })
}

module.exports = {
    add: add,
    findMessagesByRoom: findMessagesByRoom
};