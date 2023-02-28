import http from 'http';
import { app } from './app.js';

const PORT = process.env.PORT ?? 4500;

const server = http.createServer(app);

server.listen(PORT);

server.on('error', () => {
  console.log('Esto es un error en el server.on, bro');
}); // Este código es 100% innecesario. Lo dejo para constatar como ejemplo. Profesor mencionó esto durante la clase 1 y se lo repitió a ryan en la clase 2. Lo copié sin saber que hace.

server.on('listening', () => {
  console.log('Listening in http://localhost:' + PORT);
});
