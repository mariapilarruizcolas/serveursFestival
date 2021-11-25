require('dotenv').config()
const connection = require('./db_config');
const express = require('express');
const app = express();

const port = process.env.PORT || 8080;
connection.connect((err) => {
    if (err) {
      console.error('error connecting: ' + err.stack);
    } else {
      console.log('connected as id ' + connection.threadId);
    }
  });
  
  app.use(express.json());


  app.get('/api/festival', (req, res) => {
    connection.query('SELECT * FROM festival', (err, result) => {
      if (err) {
        res.status(500).send('Error retrieving data from database');
      } else {
        res.json(result);
      }
    });
  });


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });