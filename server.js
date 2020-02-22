const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const port = process.env.PORT || 8080;

const bd = [];

const checkUser = obj => {
  const result = bd.filter(user => user.email === obj.email);
  return result.length === 0;
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/hello", (req, res) => {
  res.send({ express: "Hello From Express" });
});

app.post("/sign-up", (req, res) => {
  const { acceptedTerms, ...user } = req.body;
  if (checkUser(user)) {
    bd.push(user);
    res.send("YOU COOL");
  } else {
    res.status(400).send("YOU BAAD");
  }

  // eslint-disable-next-line no-console
  console.log(bd);
});

// eslint-disable-next-line no-console
app.listen(port, () => console.log(`Listening on port ${port}`));
