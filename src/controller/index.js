const { adduser, signInUser, userStory, userReport } = require("../services");
const request = require("request");
const bcrypt = require("bcryptjs");

const createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);
    console.log(req.body, "===", hashedPassword);
    const user = await adduser({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });
    console.log(user);

    res.json({
      message: "successfully created an account",
      data: user,
      status: "success",
    });
  } catch (error) {
    console.log(error.message);
    res
      .json({
        message: "internal server error",
        status: "failed",
      })
      .status(500);
  }
};

const signIn = async (req, res) => {
  const { email, password } = req.body;
  const user = await signInUser(email);

  if (user.length === 1) {
    const passswordValid = bcrypt.compareSync(password, user[0].password); // true
    if (passswordValid) {
      res.json({
        message: "successfully logged-in user",
        data: user,
        status: "success",
      });
    } else {
      res.status(404).json({
        message: "user not found",
        status: "error",
      });
    }
  } else {
    res.status(404).json({
      message: "user not found",
      status: "error",
    });
  }
};

const userIncident = (req, res) => {
  const API_KEY = process.env.API_KEY;
  try {
    const { country, city, desc } = req.body;

    request(
      `http://api.openweathermap.org/data/2.5/weather?q=${country},${city}&APPID=${API_KEY}`,
      async function (error, response, weather) {
        if (response.statusCode === 200) {
          const data = await userStory(city, country, desc, weather);

          if (data) {
            res.json({
              status: "success",
              message: "Incident reported successfully",
              data: data,
            });
          } else {
            res.status(400).json({
              status: "Failed",
              message: "unable to report incident",
            });
          }
        }
      }
    );
  } catch (error) {
    console.log(error.message);
  }
};

const fetchReport = async (req, res) => {
  const reports = await userReport();
  return res
    .json({
      messsage: "Successfully fetch all incident",
      data: reports,
      status: "success",
    })
    .status(200);
};

module.exports = {
  userIncident,
  createUser,
  signIn,
  fetchReport,
};
