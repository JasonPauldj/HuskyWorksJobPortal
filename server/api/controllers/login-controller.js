import * as StudentService from "./../services/students-service.js";


// Setting Error Response for any errors
const setErrorResponse = (error, response) => {
    response.status(500);
    response.json(error);
};

// Setting Success Response for successful execution
const setSuccessResponse = (obj, response) => {
    response.status(200);
    response.json(obj);
};

export const login = async (request, response) => {
    try {
      const { username, password } = request.body;
      //TODO to be changed
      const students = await StudentService.getStudents();
      const student = students.find((s) => {
        return  s.username === username && s.password === password;
      });
      console.log(student, "found")
      if(student){
        setSuccessResponse(student, response);
      } else {
          response.status(400).json("Invalid Username or Password");
      }
    } catch (error) {
      setErrorResponse(error, response);
    }
};