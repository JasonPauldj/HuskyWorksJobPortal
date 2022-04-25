import * as projectService from "./../services/projects-service.js";

// Setting Error Response for any errors
const setErrorResponse = (err, res) => {
  res.status(500);
  res.json(err);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, res) => {
  res.status(200);
  res.json(obj);
};

// Method to post Project using the post service
export const postProject = async (req, res) => {
  try {
    const payload = req.body;
    const project = await projectService.addProject(payload);
    setSuccessResponse(project, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Projects using the get service
export const getAllProjects = async (req, res) => {
  try {
    const studentId = req.query.student_id;
    const query = {}

    if (studentId) {
      query.student_id = studentId;
    }
    if(query) {
        const projects = await projectService.filter(query);
        setSuccessResponse(projects, res);
    } else {
      const projects = await projectService.getEducations();
      setSuccessResponse(projects, res);
    }
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Project by id using the getById service
export const getProjectById = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectService.getProjectById(id);
    setSuccessResponse(project, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update Project using the update service
export const updateProject = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    update.id = id;
    // We pass the updated object to the service
    let project = await projectService.updateProject(update);
    setSuccessResponse(project, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove Project using the remove service
export const removeProject = async (req, res) => {
  try {
    const id = req.params.id;
    const project = await projectService.removeProject(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The Project with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
