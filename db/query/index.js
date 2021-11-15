const query = {
  addUser: `
     INSERT INTO users (
         firstName,
         lastName,
         email,
         password
     ) VALUES($1, $2, $3, $4)
     RETURNING *
    `,
  signInUser: `
    SELECT *
    FROM users
    WHERE email=$1 
    `,
  userStory: `
     INSERT INTO usersIncidents (
         city,
         country,
         incident_desc,
         weather
     ) VALUES($1, $2, $3, $4)
     RETURNING *
    `,
  getUserReport: `
    SELECT * FROM usersIncidents
    `,
};

 
module.exports = query