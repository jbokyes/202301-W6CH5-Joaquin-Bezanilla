import jwt, { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { config } from '../config.js';
import { HTTPError } from '../errors/errors.js';

export interface PayloadToken extends JwtPayload {
  id: string;
  email: string;
  role: string;
}

const salt = 10;

export class Auth {
  static createJWT(payload: PayloadToken) {
    // Esto depende del funcionamiento del programa, por lo que hacemos la excepción de tipos as : if (!config.jwtSecret) return;
    return jwt.sign(payload, config.jwtSecret as string);
  }

  static getTokenPayload(token: string) {
    const result = jwt.verify(token, config.jwtSecret as string);
    if (typeof result === 'string')
      throw new HTTPError(498, 'Invalid payload', result);
    return result as PayloadToken;
  }

  static hash(value: string) {
    return bcrypt.hash(value, salt); //recordar que este método de encriptación YA ES ASÍNCRONO
  }

  static compare(value: string, hash: string) {
    return bcrypt.compare(value, hash);
  }
}
