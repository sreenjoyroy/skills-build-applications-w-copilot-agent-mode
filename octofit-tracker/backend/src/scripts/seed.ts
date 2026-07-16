import 'dotenv/config';

import { connectDatabase, disconnectDatabase } from '../config/database.js';
import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectDatabase();

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Thunder Striders',
        coach: 'Coach Rivera',
        members: ['Ava Johnson', 'Marcus Lee', 'Sofia Patel'],
        points: 1840,
      },
      {
        name: 'Pace Makers',
        coach: 'Coach Bennett',
        members: ['Noah Kim', 'Ella Garcia', 'Jordan Smith'],
        points: 1765,
      },
    ]);

    const users = await User.insertMany([
      { name: 'Ava Johnson', email: 'ava.johnson@octofit.test', age: 15, team: teams[0].name, points: 640 },
      { name: 'Marcus Lee', email: 'marcus.lee@octofit.test', age: 16, team: teams[0].name, points: 590 },
      { name: 'Sofia Patel', email: 'sofia.patel@octofit.test', age: 15, team: teams[0].name, points: 610 },
      { name: 'Noah Kim', email: 'noah.kim@octofit.test', age: 16, team: teams[1].name, points: 575 },
      { name: 'Ella Garcia', email: 'ella.garcia@octofit.test', age: 14, team: teams[1].name, points: 620 },
      { name: 'Jordan Smith', email: 'jordan.smith@octofit.test', age: 15, team: teams[1].name, points: 570 },
    ]);

    await Activity.insertMany([
      {
        userName: users[0].name,
        activityType: 'Running',
        durationMinutes: 32,
        caloriesBurned: 290,
        activityDate: new Date('2026-07-12T07:30:00.000Z'),
        notes: 'Morning interval run around the track.',
      },
      {
        userName: users[1].name,
        activityType: 'Strength Training',
        durationMinutes: 45,
        caloriesBurned: 220,
        activityDate: new Date('2026-07-12T18:00:00.000Z'),
        notes: 'Upper body circuit with bodyweight exercises.',
      },
      {
        userName: users[2].name,
        activityType: 'Cycling',
        durationMinutes: 40,
        caloriesBurned: 310,
        activityDate: new Date('2026-07-13T16:15:00.000Z'),
        notes: 'Afternoon ride on the school trail route.',
      },
      {
        userName: users[3].name,
        activityType: 'Walking',
        durationMinutes: 50,
        caloriesBurned: 180,
        activityDate: new Date('2026-07-13T07:10:00.000Z'),
        notes: 'Brisk neighborhood walk before class.',
      },
    ]);

    await Leaderboard.insertMany([
      {
        period: 'July 2026 Weekly Challenge',
        entries: [
          { name: 'Thunder Striders', points: 1840, rank: 1 },
          { name: 'Pace Makers', points: 1765, rank: 2 },
        ],
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Cardio Blast',
        category: 'Cardio',
        durationMinutes: 25,
        difficulty: 'Medium',
        description: 'A short, high-energy workout with jumping jacks, mountain climbers, and fast feet.',
      },
      {
        name: 'Core Builder',
        category: 'Strength',
        durationMinutes: 20,
        difficulty: 'Easy',
        description: 'Core stability routine with planks, dead bugs, and controlled crunches.',
      },
      {
        name: 'Endurance Ride',
        category: 'Cycling',
        durationMinutes: 45,
        difficulty: 'Hard',
        description: 'Steady cycling session designed to build aerobic endurance.',
      },
    ]);

    const summary = await Promise.all([
      User.countDocuments(),
      Team.countDocuments(),
      Activity.countDocuments(),
      Leaderboard.countDocuments(),
      Workout.countDocuments(),
    ]);

    console.log('Seed the octofit_db database with test data');
    console.log('Database seeding complete:', {
      users: summary[0],
      teams: summary[1],
      activities: summary[2],
      leaderboards: summary[3],
      workouts: summary[4],
    });

    await disconnectDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
