import * as studentService from "./../services/students-service.js";

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

// Method to post Student using the post service
export const postStudent = async (req, res) => {
  try {
    const payload = req.body;
    const student = await studentService.addStudent(payload);
    setSuccessResponse(student, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Students using the get service
export const getAllStudents = async (req, res) => {
  try {
    const students = await studentService.getStudents();
    setSuccessResponse(students, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to get Student by id using the getById service
export const getStudentById = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentService.getStudentById(id);
    setSuccessResponse(student, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to update Student using the update service
export const updateStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const update = { ...req.body };
    updated.id = id;
    // We pass the updated object to the service
    let student = await studentService.updateStudent(update);
    setSuccessResponse(student, res);
  } catch (err) {
    setErrorResponse(err, res);
  }
};

// Method to remove Student using the remove service
export const removeStudent = async (req, res) => {
  try {
    const id = req.params.id;
    const student = await studentService.removeStudent(id);
    // As delete doesn't return anything we create a custom object to return
    setSuccessResponse(
      { message: `The Student with id ${id} has been successfully deleted!` },
      res
    );
  } catch (err) {
    setErrorResponse(err, res);
  }
};
