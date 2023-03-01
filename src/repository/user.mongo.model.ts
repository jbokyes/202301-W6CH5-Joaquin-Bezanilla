import { model, Schema } from 'mongoose';
import { User } from '../entities/user';

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: true,
  },
  passwd: {
    type: String,
    required: true,
  },
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
  },
});

export const UserModel = model('User', userSchema, 'users');
