import { model, Schema, SchemaTypes } from 'mongoose';
import { Thing } from '../entities/thing';

const thingSchema = new Schema<Thing>({
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  interestingScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
  importantScore: {
    type: Number,
    required: true,
    min: 0,
    max: 10,
  },
});

export const ThingModel = model('Thing', thingSchema, 'things');
