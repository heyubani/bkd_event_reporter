const Joi = require("joi");
const { adduser, signInUser } = require("../services");
const ResigerSchema = require("../validator");

const signupValidator = (req, res, next) => {
  const { error, value } = ResigerSchema.validate(req.body);
  if (error) {
    res.send({ error });
  } else {
    next();
  }
};

const getUser = (req, res, next) => {
  try {
    const { email } = req.body;
    const createUser = signInUser(email);
    if (createUser.length) {
      res
        .json({
          message: "user already exist",
          data: createUser,
        })
        .status(400);
    }
    next();
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  getUser,
  signupValidator,
};
