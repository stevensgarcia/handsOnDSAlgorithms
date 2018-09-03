const express = require('express');
const bodyParser = require('body-parser');
const app = express();

let message = require('./routes/messages');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/message', message);

app.get('/', (req, res) => {
  res.status(200).send('OK!');
});


app.listen(3000, () => {
  console.log('Chat application listening on port 3000');
});
