const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const MongoClient = require('mongodb').MongoClient;

require('dotenv').config();

app.use(bodyParser.json());

let database;

new MongoClient(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true}).connect((err, client) => {
  console.log('Connected to MongoDB...');

  app.listen(3000, () => {
    database = client.db('contacts-app-vm');
    console.log('Listening on the quiet storm...:* -> 3000');
  });
});

app.get('/api/contacts', (req, res) => {
  const contactsCollection = database.collection('contacts');

  contactsCollection.find({}).toArray((err, docs) => {
    return res.json(docs);
  });
});

app.post('/api/contacts/', (req, res) => {
  const user = req.body;

  const contactsCollection = database.collection('contacts');
  contactsCollection.insertOne(user, {}, (err, r) => {
    if (err) {
      return res.status(500).json({error: 'Error inserting new record.'});
    }
    const newRecord = r.ops[0];

    return res.status(201).json(newRecord);
  });
});
