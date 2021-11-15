const { json } = require("express");
const express = require("express");
const { db } = require("../db");

const router = require("./route")
const app = express();
const PORT = process.env.PORT || 3300;



app.use(express.urlencoded({ extended: false }));
app.use(express.json());


app.get("/", (req, res) => {
  res.send("welcome");
});
app.use(router)



db.connect()
  .then((obj) => {
    app.listen(PORT, () => {
      obj.done(), console.log(`server listening on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
