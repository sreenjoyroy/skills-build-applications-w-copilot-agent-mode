import { Schema, model } from 'mongoose';

const leaderboardSchema = new Schema(
  {
    period: { type: String, required: true },
    entries: {
      type: [
        {
          name: { type: String, required: true },
          points: { type: Number, required: true },
          rank: { type: Number, required: true },
        },
      ],
      default: [],
    },
  },
  { timestamps: true },
);

export const Leaderboard = model('Leaderboard', leaderboardSchema);