import express from 'express';
import morgan from 'morgan';
import cors from 'cors';

export const app = express();
app.disable('x-powered-by');

const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

/* Prueba de middleware del profesor
app.use((_req, _resp, next) => {
  console.log('Soy un middleware');
}); */
