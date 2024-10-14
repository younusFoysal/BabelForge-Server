const request = require('supertest');
const express = require('express');
const { allDashinfo } = require('../controllers/dashboardController');
const { getTeamsCollection } = require('../models/teamModel');
const { getTasksCollection } = require('../models/taskModel');

jest.mock('../models/teamModel');
jest.mock('../models/taskModel');

const app = express();
app.use(express.json());
app.locals.db = {}; // Mock db object
app.get('/dashboard/:email', allDashinfo);

describe('Dashboard Controller Tests', () => {
  const mockDb = {};
  
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return dashboard information', async () => {
    const email = 'testuser@example.com';
    const mockTeams = [
      { tmembers: ['testuser@example.com', 'user1@example.com'] },
      { tmembers: ['user2@example.com'] },
    ];
    const mockTasks = [
      { author: 'testuser@example.com', tproces: 'todo' },
      { author: 'testuser@example.com', tproces: 'inProgress' },
      { author: 'user1@example.com', tproces: 'done' },
    ];

    getTeamsCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockTeams),
      }),
    });

    getTasksCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue(mockTasks),
      }),
    });

    const response = await request(app).get(`/dashboard/${email}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalTeams: 2,
      totalTasks: 3,
      pendingTasks: 2,
      totalTeamMembers: 3,
      TodoTasks: 1,
      DoneTask: 1,
      InprogressTask: 1,
      newmamber: ['testuser@example.com', 'user1@example.com', 'user2@example.com'],
    });
  });

  test('should return zero counts when there are no teams or tasks', async () => {
    const email = 'testuser@example.com';
    
    getTeamsCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([]),
      }),
    });

    getTasksCollection.mockReturnValue({
      find: jest.fn().mockReturnValue({
        toArray: jest.fn().mockResolvedValue([]),
      }),
    });

    const response = await request(app).get(`/dashboard/${email}`);
    
    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      totalTeams: 0,
      totalTasks: 0,
      pendingTasks: 0,
      totalTeamMembers: 0,
      TodoTasks: 0,
      DoneTask: 0,
      InprogressTask: 0,
      newmamber: [],
    });
  });
});
