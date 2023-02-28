import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import { thingsRouter } from './router/things.router.js';

export const app = express();
app.disable('x-powered-by');
const corsOptions = {
  origin: '*',
};

app.use(morgan('dev'));
app.use(express.json());
app.use(cors(corsOptions));

/* Prueba de middleware del profesor --> Lo dejo a pesar de que me gritó para dejarlo como ejemplo. Es un middleware tonto que no hace nada.
app.use((_req, _resp, next) => {
  console.log('Soy un middleware');
}); */
/*app.use('/things', thingsRouter);*/
app.use('/', thingsRouter);
