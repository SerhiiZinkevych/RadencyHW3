const express = require('express');
const Mongoose = require('mongoose');
const logger = require('morgan');
const cors = require('cors');

const notesRouter = require('./notes/notes.router');

require('dotenv').config();

class Server {
  constructor() {
    this.server = null;
  }
  initServer() {
    this.server = express();
  }
  async start() {
    this.initServer();
    await this.initDB();
    this.initMiddleWares();
    this.initRoutes();
    return this.startListening();
  }

  async initDB() {
    try {
      await Mongoose.connect(process.env.MONGODB_URL);
      console.log('\x1b[32m%s\x1b[0m', 'Database connection successful.');
    } catch (error) {
      console.log('\x1B[31m%s\x1b[0m', 'Failed to connect to database.');
      console.log(error);
      process.exit(1);
    }
  }

  initMiddleWares() {
    const formatsLogger =
      this.server.get('env') === 'development' ? 'dev' : 'short';
    this.server.use(logger(formatsLogger));
    this.server.use(cors());
    this.server.use(express.json());
  }

  initRoutes() {
    this.server.use('/notes', notesRouter);

    this.server.use((req, res) => {
      res.status(404).json({ message: 'Not found' });
    });

    this.server.use((err, req, res, next) => {
      res.status(500).json({ message: err.message });
    });
  }

  startListening() {
    return this.server.listen(process.env.PORT, () => {
      console.log(
        'Server started listening on port:',
        '\x1b[33m',
        process.env.PORT,
        '\x1b[0m'
      );
    });
  }
}

module.exports = Server;