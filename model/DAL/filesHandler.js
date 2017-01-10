const UserFile = require(__dirname + '/Schemas/files.js');
const add = (buff, filename, uid) => new UserFile({buffer: buff, filename: filename, uid: uid}).save();
const findWithUID = (uid) => UserFile.findOne({uid}).exec();
  
module.exports = {
  add,
  findWithUID,
};
