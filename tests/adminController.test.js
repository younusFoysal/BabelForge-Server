// const { adminDashboard } = require("../controllers/adminController");
// const { getProjectsCollection } = require("../models/projectModel");
// const { getTasksCollection } = require("../models/taskModel");
// const { getTeamsCollection } = require("../models/teamModel");
// const { getUsersCollection } = require("../models/userModel");

// jest.mock("../models/projectModel", () => ({
//   getProjectsCollection: jest.fn(),
// }));

// jest.mock("../models/taskModel", () => ({
//   getTasksCollection: jest.fn(),
// }));

// jest.mock("../models/teamModel", () => ({
//   getTeamsCollection: jest.fn(),
// }));

// jest.mock("../models/userModel", () => ({
//   getUsersCollection: jest.fn(),
// }));

// describe("Admin Dashboard Tests", () => {
//   let mockReq, mockRes;
//   let mockDb;
//   let mockUserCollection, mockProjectCollection, mockTeamCollection, mockTaskCollection;

//   beforeEach(() => {
//     // Mock collections
//     mockUserCollection = {
//       find: jest.fn().mockReturnValue({
//         toArray: jest.fn().mockResolvedValue([]), // Return empty array by default
//       }),
//     };
//     mockProjectCollection = {
//       find: jest.fn().mockReturnValue({
//         toArray: jest.fn().mockResolvedValue([]), // Return empty array by default
//       }),
//     };
//     mockTeamCollection = {
//       find: jest.fn().mockReturnValue({
//         toArray: jest.fn().mockResolvedValue([]), // Return empty array by default
//       }),
//     };
//     mockTaskCollection = {
//       find: jest.fn().mockReturnValue({
//         toArray: jest.fn().mockResolvedValue([]), // Return empty array by default
//       }),
//     };

//     // Mock database
//     mockDb = {};

//     // Mock collection return values
//     getUsersCollection.mockReturnValue(mockUserCollection);
//     getProjectsCollection.mockReturnValue(mockProjectCollection);
//     getTeamsCollection.mockReturnValue(mockTeamCollection);
//     getTasksCollection.mockReturnValue(mockTaskCollection);

//     // Mock request and response objects
//     mockReq = {
//       app: {
//         locals: { db: mockDb },
//       },
//     };
//     mockRes = {
//       send: jest.fn(),
//     };
//   });

//   afterEach(() => {
//     jest.clearAllMocks(); // Clear mocks after each test
//   });

//   test("should return admin dashboard statistics with empty collections", async () => {
//     // Call the adminDashboard function with mocked req and res
//     await adminDashboard(mockReq, mockRes);

//     // Check that the send method was called with the expected data
//     expect(mockRes.send).toHaveBeenCalledWith({
//       ulen: 0, // total users (empty)
//       lwulen: 0, // last week users (empty)
//       plen: 0, // total projects (empty)
//       lwplen: 0, // last week projects (empty)
//       tmlen: 0, // total teams (empty)
//       lwtmlen: 0, // last week teams (empty)
//       tslen: 0, // total tasks (empty)
//       lwtslen: 0, // last week tasks (empty)
//     });

//     // Verify that find was called on each collection
//     expect(mockUserCollection.find).toHaveBeenCalledTimes(2); // all users and last week users
//     expect(mockProjectCollection.find).toHaveBeenCalledTimes(2); // all projects and last week projects
//     expect(mockTeamCollection.find).toHaveBeenCalledTimes(2); // all teams and last week teams
//     expect(mockTaskCollection.find).toHaveBeenCalledTimes(2); // all tasks and last week tasks
//   });

//   test("should return admin dashboard statistics with sample data", async () => {
//     // Mock data for collections
//     const mockUsers = [{}, {}, {}]; // 3 users
//     const mockProjects = [{}, {}, {}, {}]; // 4 projects
//     const mockTeams = [{}, {}]; // 2 teams
//     const mockTasks = [{}, {}, {}, {}, {}]; // 5 tasks

//     const mockLastWeekUsers = [{}]; // 1 user in the last week
//     const mockLastWeekProjects = [{}, {}]; // 2 projects in the last week
//     const mockLastWeekTeams = [{}]; // 1 team in the last week
//     const mockLastWeekTasks = [{}, {}]; // 2 tasks in the last week

//     // Mock the toArray calls to return the above data
//     mockUserCollection.find().toArray
//       .mockResolvedValueOnce(mockUsers) // total users
//       .mockResolvedValueOnce(mockLastWeekUsers); // last week users

//     mockProjectCollection.find().toArray
//       .mockResolvedValueOnce(mockProjects) // total projects
//       .mockResolvedValueOnce(mockLastWeekProjects); // last week projects

//     mockTeamCollection.find().toArray
//       .mockResolvedValueOnce(mockTeams) // total teams
//       .mockResolvedValueOnce(mockLastWeekTeams); // last week teams

//     mockTaskCollection.find().toArray
//       .mockResolvedValueOnce(mockTasks) // total tasks
//       .mockResolvedValueOnce(mockLastWeekTasks); // last week tasks

//     // Call the adminDashboard function
//     await adminDashboard(mockReq, mockRes);

//     // Check that the send method was called with the correct data
//     expect(mockRes.send).toHaveBeenCalledWith({
//       ulen: 3, // total users
//       lwulen: 1, // last week users
//       plen: 4, // total projects
//       lwplen: 2, // last week projects
//       tmlen: 2, // total teams
//       lwtmlen: 1, // last week teams
//       tslen: 5, // total tasks
//       lwtslen: 2, // last week tasks
//     });

//     // Verify that collections were queried correctly
//     expect(mockUserCollection.find).toHaveBeenCalledTimes(2); // all users and last week users
//     expect(mockProjectCollection.find).toHaveBeenCalledTimes(2); // all projects and last week projects
//     expect(mockTeamCollection.find).toHaveBeenCalledTimes(2); // all teams and last week teams
//     expect(mockTaskCollection.find).toHaveBeenCalledTimes(2); // all tasks and last week tasks
//   });
// });
