const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

const bd = [];

const checkUser = (obj) => {
  let result = bd.filter(user => user.email === obj.email);
  return result.length === 0;
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/sign-up', (req, res) => {
  const {acceptedTerms, ...user} = req.body;
  if (checkUser(user)) {
    bd.push(user);
    res.send('YOU COOL');
  } else {
    res.status(400).send('YOU BAAD');
  }

  console.log(bd);
  
});

app.listen(port, () => console.log(`Listening on port ${port}`));