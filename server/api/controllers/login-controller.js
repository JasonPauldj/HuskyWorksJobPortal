import * as StudentService from "./../services/students-service.js";
import jwt from 'jsonwebtoken';

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

let refreshTokens = [];

const generateAccessToken = (student) => {
   return jwt.sign({ id:student.id }, "mySecretKey", {expiresIn: "15m"})
}

const generateRefreshToken = (student) => {
   return jwt.sign({ id:student.id }, "myRefreshSecretKey", {expiresIn: "15m"})
}

export const login = async (request, response) => {
    try {
      const { username, password } = request.body;
      //TODO to be changed
      const students = await StudentService.getStudents();
      const student = students.find((s) => {
        return s.username === username && s.password === password
      });
        
      
      if(student){
          console.log(student, "found")
          //generate an access token
          const accessToken = generateAccessToken(student)
          const refreshToken = generateRefreshToken(student);
          console.log(accessToken, "  ", refreshToken);
          refreshTokens.push(refreshToken);
          response.status(200).json({
            _id: student._id,
            userName: student.username,
            emailId: student.email,
            token: accessToken,
            refreshToken:refreshToken,
            isAdmin: false,
          });
        // setSuccessResponse(login, response);
      } else {
          response.status(400).json("Invalid Username or Password");
      }
    } catch (error) {
      setErrorResponse(error, response);
    }
};


export const refresh = async (request, response) => {
    //take the refresh token from user
    const refreshToken = request.body.token;
    
    //send error if it is invalid or no token
    if(!refreshToken) return response.status(401).json("You are not authenticated");
    //otherwise create new access token, refresh token and send to user
    if(!refreshTokens.includes(refreshToken)) 
     return response.status(403).json("Refresh Token is not valid");
     jwt.verify(refreshToken, "myRefreshSecretKey", (error, student) => {
        if(error) {
         console.log(error);
        }
        refreshTokens = refreshTokens.filter((token) => token !== refreshToken);
        const newAccessToken = generateAccessToken(student);
        const newRefreshToken = generateRefreshToken(student);
        refreshTokens.push(newRefreshToken);
        response.status(200).json({
            accessToken: newAccessToken,
            refreshToken : newRefreshToken,
        })
    });
}

export const logout = async (request, response) => {
    const refreshToken = request.body.token;
    refreshTokens = refreshTokens.filter(token => token !== refreshToken)
    response.status(200).json("You are logged out successfully");
}

