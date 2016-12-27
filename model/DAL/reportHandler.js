const report = require(__dirname + '/Schemas/report.js');
/**
 * [adds report to database]
 * @param {[String]} reporteduser      [username of reporteduser]
 * @param {[String]} reportedby      [username of user who sent the report]
 * @param {[String]} reason [reason why the user should be banned/inactivated]
 * @returns {[Promise]} [resolves to object of report]
 */
const add = (reporteduser, reportedby, reason) => new report({reporteduser, reportedby, reason}).save();

/**
 * [removes report from database using id]
 * {[String]} id [id of report to be removed]
 */
const remove = (id) => report.find({id}).remove().exec();

/**
 * [removes all reports of specified user]
 * {[String]} username [username of reported user]
 */
const removeAllOfUser = (username) => report.find({reporteduser: username}).remove().exec();
  
module.exports = {
  add,
  remove,
  removeAllOfUser,
};
