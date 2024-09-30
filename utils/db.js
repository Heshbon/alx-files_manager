#!/usr/bin/env node

// Import the MongoClient from the mongodb package

const { MongoClient } = require('mongodb');

/**
 * Class DBClient for interacting with MongoDB.
 */
class DBClient {
  /**
   * Constructor to initialize the MongoDB client.
   */
  constructor() {
    const host = process.env.DB_HOST || 'localhost';
    const port = process.env.DB_PORT || '27017';
    const database = process.env.DB_DATABASE || 'files_manager';
    const url = `mongodb://${host}:${port}`;

    this.client = new MongoClient(url, { useUnifiedTopology: true });
    this.client.connect();
    this.db = this.client.db(database);
  }

  /**
   * Check if the connection to MongoDB is alive.
   *
   * @returns {boolean} Returns true if the client is connected, otherwise false.
   */
  isAlive() {
    return this.client.topology.isConnected();
  }

  async isAliveWithTimeout(timeout = 2000) {
    return new Promise((resolve) => {
      const timer = setTimeout(() => {
        console.error('MongoDB ping timed out');
        resolve(false);
      }, timeout);

      this.client
        .db()
        .admin()
        .ping()
        .then(() => {
          clearTimeout(timer);
          resolve(true);
        })
        .catch((error) => {
          clearTimeout(timer);
          console.error('MongoDB ping failed:', error.message);
          resolve(false);
        });
    });
  }

  /**
   * Count the number of documents in the users collection.
   */
  async nbUsers() {
    return this.db.collection('users').countDocuments();
  }

  /**
   * Count the number of documents in the files collection
   */
  async nbFiles() {
    return this.db.collection('files').countDocuments();
  }
}

// Create an instance of DBClient and export it for use in other modules
const dbClient = new DBClient();

module.exports = dbClient;
