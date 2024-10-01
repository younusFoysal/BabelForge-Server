const { getTeamsCollection } = require("../models/teamModel");
const { getTasksCollection } = require("../models/taskModel");

// Get all dashboard information.

const allDashinfo = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const tasksCollection = getTasksCollection(db);
  const teams = await teamCollection.find().toArray();
  const tasks = await tasksCollection.find().toArray();

  const pendingTasks = tasks.filter(
    (task) => task.tproces === "inProgress" || task.tproces === "todo"
  );

  const totalTeamMembers = teams.reduce(
    (sum, team) => sum + team.tmembers.length,
    0
  );

  const totalTeams = teams.length;
  const totalTasks = tasks.length;
  const totalPendingTasks = pendingTasks.length;

  res.send({ totalTeams, totalTasks, totalPendingTasks, totalTeamMembers });
};

module.exports = { allDashinfo };
