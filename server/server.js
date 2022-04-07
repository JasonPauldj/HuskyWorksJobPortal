import app from "./api/app.js";

// Port number to run the server on
const port = 9000;

// Tells the app to listen to the given port number
app.listen(port, () => {
  console.log(`Server running at PORT ${port}`);
});
