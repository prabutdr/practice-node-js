const express = require('express');
const Joi = require('joi');
const courses = require('./routes/courses');

const app = express();

app.use(express.json());

app.use('/api/course', courses);

app.get('/', (req, res) => {
  res.send('Hello World!!!');
});

app.get('/api/posts/:year/:month', (req, res) => {
  // res.send(req.params);
  res.send(req.query);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));