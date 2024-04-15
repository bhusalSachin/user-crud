const mongoose = require("mongoose");

//connecting to mongodb using mongoose
// mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGO_URL)
  .then((db) => {
    console.log("Connected to the mongodb server successfuly: ");
  })
  .catch((err) => console.log(err));
