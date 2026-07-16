import { Router } from 'express';

import { Activity } from '../models/activity.js';
import { Leaderboard } from '../models/leaderboard.js';
import { Team } from '../models/team.js';
import { User } from '../models/user.js';
import { Workout } from '../models/workout.js';

export const dataRouter = Router();

dataRouter.get('/summary', async (_request, response, next) => {
  try {
    const [users, teams, activities, leaderboards, workouts] = await Promise.all([
      User.find().sort({ points: -1 }).lean(),
      Team.find().sort({ points: -1 }).lean(),
      Activity.find().sort({ activityDate: -1 }).lean(),
      Leaderboard.find().sort({ updatedAt: -1 }).lean(),
      Workout.find().sort({ createdAt: -1 }).lean(),
    ]);

    response.json({
      counts: {
        users: users.length,
        teams: teams.length,
        activities: activities.length,
        leaderboards: leaderboards.length,
        workouts: workouts.length,
      },
      users,
      teams,
      activities,
      leaderboards,
      workouts,
    });
  } catch (error) {
    next(error);
  }
});

dataRouter.get('/users', async (_request, response, next) => {
  try {
    const users = await User.find().sort({ points: -1 }).lean();
    response.json(users);
  } catch (error) {
    next(error);
  }
});

dataRouter.get('/teams', async (_request, response, next) => {
  try {
    const teams = await Team.find().sort({ points: -1 }).lean();
    response.json(teams);
  } catch (error) {
    next(error);
  }
});

dataRouter.get('/activities', async (_request, response, next) => {
  try {
    const activities = await Activity.find().sort({ activityDate: -1 }).lean();
    response.json(activities);
  } catch (error) {
    next(error);
  }
});

dataRouter.get('/leaderboard', async (_request, response, next) => {
  try {
    const leaderboard = await Leaderboard.findOne().sort({ updatedAt: -1 }).lean();
    response.json(leaderboard);
  } catch (error) {
    next(error);
  }
});

dataRouter.get('/workouts', async (_request, response, next) => {
  try {
    const workouts = await Workout.find().sort({ createdAt: -1 }).lean();
    response.json(workouts);
  } catch (error) {
    next(error);
  }
});