import { Schema, model } from 'mongoose';

const teamSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    coach: { type: String, required: true },
    members: { type: [String], default: [] },
    points: { type: Number, required: true, default: 0 },
  },
  { timestamps: true },
);

export const Team = model('Team', teamSchema);