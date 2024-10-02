const { getTeamsCollection } = require("../models/teamModel");
const { getTasksCollection } = require("../models/taskModel");

// Get all dashboard information.

const allDashinfo = async (req, res) => {
  const db = req.app.locals.db;
  const teamCollection = getTeamsCollection(db);
  const tasksCollection = getTasksCollection(db);

  const email = req.params.email;
  const query = { tmembers: email };
  const taskquery = { author: email };
  const team = await teamCollection.find(query).toArray();

  const tasks = await tasksCollection.find(taskquery).toArray();

  const pendingTasks = tasks.filter(
    (task) => task.tproces === "inProgress" || task.tproces === "todo"
  ).length;
  const TodoTasks = tasks.filter((task) => task.tproces === "todo").length;
  const DoneTask = tasks.filter((task) => task.tproces === "done").length;
  const InprogressTask = tasks.filter(
    (task) => task.tproces === "inProgress"
  ).length;

  const totalTeamMembers = team.reduce(
    (sum, team) => sum + team.tmembers.length,
    0
  );

  const newmamber = [...new Set(team.flatMap((t) => t.tmembers))];

  const totalTeams = team.length;
  const totalTasks = tasks.length;

  res.send({
    totalTeams,
    totalTasks,
    pendingTasks,
    totalTeamMembers,
    TodoTasks,
    DoneTask,
    InprogressTask,
    newmamber,
  });
};

module.exports = { allDashinfo };
