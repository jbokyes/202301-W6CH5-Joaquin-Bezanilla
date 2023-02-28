import { model, Schema, SchemaTypes } from 'mongoose';
import { Thing } from '../entities/thing.js';

const thingSchema = new Schema<Thing>({
  name: {
    type: SchemaTypes.String,
    required: true,
    unique: true,
  },
  interestingScore: {
    type: SchemaTypes.Number,
    required: true,
    min: 0,
    max: 10,
  },
  importantScore: {
    type: SchemaTypes.Number,
    required: true,
    min: 0,
    max: 10,
  },
});

export const ThingModel = model('Thing', thingSchema, 'things');
