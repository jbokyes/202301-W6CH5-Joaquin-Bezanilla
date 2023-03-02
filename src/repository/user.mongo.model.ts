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
  }, // OPCIONAL
  things: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Thing',
    },
  ],
});

userSchema.set('toJSON', {
  transform(_document, returnedObject) {
    returnedObject.id = returnedObject._id;
    delete returnedObject.__v;
    delete returnedObject._id;
    delete returnedObject.passwd;
  },
});

export const UserModel = model('User', userSchema, 'users');
