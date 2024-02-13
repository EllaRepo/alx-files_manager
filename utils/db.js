import { MongoClient } from 'mongodb';

const HOST = process.env.DB_HOST || 'localhost';
const PORT = process.env.DB_PORT || 27017;
const DATABASE = process.env.DB_DATABASE || 'files_manager';
const URL = `mongodb://${HOST}:${PORT}`;

class DBClient {
  constructor() {
    this.client = new MongoClient(URL, { useUnifiedTopology: true, useNewUrlParser: true });
    this.client.connect().then(() => {
      this.db = this.client.db(`${DATABASE}`);
    }).catch((err) => {
      console.log(err);
    });
  }

  async connect() {
    try {
      await this.client.connect();
      this.db = this.client.db(`${DATABASE}`);
    } catch (err) {
      console.log(err);
    }
  }

  isAlive() {
    return this.client.isConnected();
  }

  async nbUsers() {
    const usrCollection = this.client.db.collection('users');
    const nusr = await usrCollection.countDocuments();
    return nusr;
  }

  async nbFiles() {
    const filesCollection = this.client.db.collection('files');
    const nfiles = await filesCollection.countDocuments();
    return nfiles;
  }
}

const dbClient = new DBClient();

module.exports = dbClient;
