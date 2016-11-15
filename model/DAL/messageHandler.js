'use strict';

const Message = require(__dirname + '/Schemas/message.js');

const add = function (uID, rID, message) {
  let newMessage = new Message({
    userID: uID,
    roomID: rID,
    message: message,
    timestamp: new Date(),
  });

  newMessage.save(function (err) {
    if (err) {
      console.log('failed to send message. Error: \n' + err);
      return;
    }
    console.log('message sent');
  });
};

const findMessagesByRoom = (roomID) => Message.findOne({roomID});
/*const findMessagesByRoom = (rID) {
  return new Promise((resolve, reject) => {
    Message.find({ 'roomID': rID }, function (err, messages) {
      if (err) {
        return reject(err);
      }
      return resolve(messages);
    });
  });
};*/

module.exports = {
  add: add,
  findMessagesByRoom: findMessagesByRoom,
};