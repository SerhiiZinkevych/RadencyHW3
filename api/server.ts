import express, { Application, Request, Response } from 'express';
import Mongoose from 'mongoose';
import logger from 'morgan';
import cors from 'cors';
import dotenv from 'dotenv';
import notesRouter from './notes/notes.router';

dotenv.config();

export default class Server {
  server: Application;
  constructor() {
    this.server = express();
  }

  async start() {
    await this.initDB();
    this.initMiddleWares();
    this.initRoutes();
    return this.startListening();
  }

  async initDB() {
    try {
      await Mongoose.connect(process.env.MONGODB_URL || '');
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

    this.server.use((req: Request, res: Response) => {
      res.status(404).json({ message: 'Not found' });
    });

    this.server.use((err: Error, req: Request, res: Response) => {
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
