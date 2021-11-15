const { db } = require("../../db");
const query = require("../../db/query");
var bcrypt = require("bcryptjs");

const adduser = (data) => {
  var salt = bcrypt.genSaltSync(10);
  var hashedPassword = bcrypt.hashSync(data.password, salt);
  const payload = [data.firstName, data.lastName, data.email, hashedPassword];
  return db.any(query.addUser, payload);
};

const signInUser = (email) => {
  const payload = [email];
  return db.any(query.signInUser, payload);
};

const userStory = (city, country, incident_desc, weather) => {
  const payload = [city, country, incident_desc, weather];
  return db.any(query.userStory, payload);
};

const userReport = () => db.many(query.getUserReport);

module.exports = {
  adduser,
  signInUser,
  userStory,
  userReport,
};
