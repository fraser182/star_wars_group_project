const express = require('express');
const app = express();
const path = require('path');
const parser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;
const createRouter = require('./helpers/create_router.js');

const publicPath = path.join(__dirname, '../client/public');
app.use(express.static(publicPath));

app.use(parser.json());

// Database
MongoClient.connect('mongodb://localhost:27017')
.then((client) => {
  const db = client.db('star_wars_world');
  // General Quiz
  const generalQuizCollection = db.collection('generalQuiz');
  const generalQuizRouter = createRouter(generalQuizCollection);
  app.use('/api/generalquiz', generalQuizRouter);
  // Character Quiz
  const characterQuizCollection = db.collection('characterQuiz');
  const characterQuizRouter = createRouter(characterQuizCollection);
  app.use('/api/characterquiz', characterQuizRouter);
  // Side Quiz
  const sideQuizCollection = db.collection('sideQuiz');
  const sideQuizRouter = createRouter(sideQuizCollection);
  app.use('/api/sidequiz', sideQuizRouter);
})
.catch(console.error);

app.listen(3000, function(){
  console.log(`Listening on port ${this.address().port}`);
});
