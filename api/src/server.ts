import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';

import cors from 'cors';
import morgan from 'morgan';

import { config } from 'dotenv';
import { connect } from 'mongoose';
import router from './router';

config();

const {
  PORT,
  MONGO_URL
} = process.env;

connect(String(MONGO_URL))
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use(cors());
    app.use(morgan('dev'));
    app.use(router);

    app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
      if (err instanceof Error) return res.status(400).json({ error: err.message });

      return res.status(500).json({
        status: 'error',
        message: 'Internal server error'
      });
    });

    app.get('/', (req, res) => {
      res.send('Uhull, running :D');
    });

    app.listen(PORT || 3333, () => {
      console.log(`🚀 Listening on http://localhost:${PORT || 3333}`);
    });
  })
  .catch(err => {
    console.log('Erro ao conectar com o Mongo');
  });
