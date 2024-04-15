// Import required modules
const express = require("express");
const cors = require("cors");
require("dotenv").config();

//connecting to the mongodb database
require("./backend/models/db");

// Create Express application
const app = express();
app.use(cors());
// Middleware to parse JSON
app.use(express.json());

//importing the routes
const { router } = require("./backend/routes");
app.use(router);

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
