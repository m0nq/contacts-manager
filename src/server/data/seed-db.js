require('dotenv').config();

const users = require('./users');
const contacts = require('./contacts');

const MongoClient = require('mongodb').MongoClient;
const bcrypt = require('bcrypt');

const seedCollection = (collectionName, initialRecords) => {
  new MongoClient(process.env.DB_CONN, {useNewUrlParser: true, useUnifiedTopology: true}).connect((err, client) => {
    console.log('Connected to MongoDB');
    const collection = client.db('contacts-app-vm').collection(collectionName);

    collection.deleteMany();

    initialRecords.forEach(item => {
      if (item.password) {
        item.password = bcrypt.hashSync(item.password, 10);
      }
    });

    collection.insertMany(initialRecords, (err, result) => {
      console.log(`Inserted ${result.insertedCount} records`);
      console.log('closing connection...');
      client.close();
    });
  });
};

seedCollection('users', users);
seedCollection('contacts', contacts);
