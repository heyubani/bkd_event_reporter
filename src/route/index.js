const express = require("express");
const router = express.Router();
// const { getUser } = require("../middleware")
const {
  createUser,
  signIn,
  userIncident,
  fetchReport,
} = require("../controller");

router.post("/incident", userIncident);
router.post("/api/signup", createUser);
router.post("/api/signin", signIn);
router.get("api/report", fetchReport);

module.exports = router;
