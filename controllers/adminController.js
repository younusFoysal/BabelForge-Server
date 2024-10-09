const { getProjectsCollection } = require("../models/projectModel");
const { getTasksCollection } = require("../models/taskModel");
const { getTeamsCollection } = require("../models/teamModel");
const { getUsersCollection } = require("../models/userModel");

const adminDashboard = async (req, res) => {

    const db = req.app.locals.db;
    const userCollection = getUsersCollection(db);
    const projectCollection = getProjectsCollection(db);
    const teamCollection = getTeamsCollection(db);
    const taskCollection = getTasksCollection(db);

    // get all data from collections
    const users = await userCollection.find({}).toArray();
    const projects = await projectCollection.find({}).toArray();
    const teams = await teamCollection.find({}).toArray();
    const tasks = await taskCollection.find({}).toArray();


    // last week query based on timestamp
    const currentTime = Date.now();
    const lastWeek = currentTime - 7 * 24 * 60 * 60 * 1000;
    const queryByTimestamp = { timestamp: { $gte: lastWeek } };

    // get last week users
    const lastWeekUsers = await userCollection.find(queryByTimestamp).toArray();


    // get last week based on Date
    const currentDate = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(currentDate.getDate() - 7);

    // project query
    const projectQuery = {
        psdate: {
            $gte: sevenDaysAgo.toISOString()
        }
    };

    //get last week projects
    const lastWeekProjects = await projectCollection.find(projectQuery).toArray();


    // task query
    const taskQuery = {
        tdate: {
            $gte: sevenDaysAgo.toISOString()
        }
    };
    // get last week tasks
    const lastWeekTasks = await taskCollection.find(taskQuery).toArray();


    // team query
    const teamQuery = {
        createdAt: {
            $gte: sevenDaysAgo
        }
    };
    // get last week teams
    const lastWeekTeams = await teamCollection.find(teamQuery).toArray();


    res.send(
        {
            // all users length
            ulen: users.length,
            // last week users length 
            lwulen: lastWeekUsers.length,

            // all projects length
            plen: projects.length,
            // last week projects length 
            lwplen: lastWeekProjects.length,

            // all teams length
            tmlen: teams.length,
            // last week teams length 
            lwtmlen: lastWeekTeams.length,

            // all tasks length
            tslen: tasks.length,
            // last week tasks length 
            lwtslen: lastWeekTasks.length
        }
    );
}
module.exports = { adminDashboard };