const {
  addPoject,
  deleteProject,
  getProjects,
  getsingleProject,
  updateProject,
  getMyProjects,
} = require('../controllers/projectController');
const {
  addProjects,
  deleteProjects,
  updateProjects,
  getAllProjects,
  SingleProject,
  findMyProjects,
  searchAndFilterProject,
} = require('../services/projectService');

jest.mock('../services/projectService');

describe('Project Controller Tests', () => {
  let req, res, db;

  beforeEach(() => {
    db = {};
    req = {
      app: { locals: { db } },
      body: {},
      query: {},
      params: {},
    };
    res = {
      send: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
    jest.clearAllMocks();
  });

  test('addPoject should add a new project', async () => {
    const mockProjects = { name: 'New Project' };
    const mockResult = { insertedId: 'newProjectId' };
    req.body = mockProjects;
    addProjects.mockResolvedValue(mockResult);

    await addPoject(req, res);

    expect(addProjects).toHaveBeenCalledWith(db, mockProjects);
    expect(res.send).toHaveBeenCalledWith(mockResult);
  });

  test('getProjects should get all projects and search projects', async () => {
    const mockResult = [{ name: 'Project 1' }];
    req.query = { name: 'Project', category: 'Category', email: 'test@example.com' };
    searchAndFilterProject.mockResolvedValue(mockResult);

    await getProjects(req, res);

    expect(searchAndFilterProject).toHaveBeenCalledWith(db, 'Project', 'Category', 'test@example.com');
    expect(res.send).toHaveBeenCalledWith(mockResult);
  });

  test('getMyProjects should get all projects the user is in', async () => {
    const mockResult = [{ name: 'My Project' }];
    req.query = { name: 'My Project', email: 'test@example.com' };
    findMyProjects.mockResolvedValue(mockResult);

    await getMyProjects(req, res);

    expect(findMyProjects).toHaveBeenCalledWith(db, {
      pname: { $regex: 'My Project', $options: 'i' },
      pallmembers: 'test@example.com',
    });
    expect(res.send).toHaveBeenCalledWith(mockResult);
  });

  test('getsingleProject should get a single project by id', async () => {
    const mockResult = { name: 'Single Project' };
    req.params.id = 'projectId';
    SingleProject.mockResolvedValue(mockResult);

    await getsingleProject(req, res);

    expect(SingleProject).toHaveBeenCalledWith(db, 'projectId');
    expect(res.send).toHaveBeenCalledWith(mockResult);
  });

  test('deleteProject should delete a project by id', async () => {
    const mockResult = { deletedCount: 1 };
    req.params.id = 'projectId';
    deleteProjects.mockResolvedValue(mockResult);

    await deleteProject(req, res);

    expect(deleteProjects).toHaveBeenCalledWith(db, 'projectId');
    expect(res.send).toHaveBeenCalledWith(mockResult);
  });

  test('updateProject should update a project by id', async () => {
    const mockResult = { matchedCount: 1, modifiedCount: 1 };
    req.params.id = 'projectId';
    req.body = { pname: 'Updated Project' };
    updateProjects.mockResolvedValue(mockResult);

    await updateProject(req, res);

  });
});