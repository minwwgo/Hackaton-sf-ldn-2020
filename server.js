const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const morgan=require("morgan")

const companies = require("./routes/api/companies");
const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const opportunities = require("./routes/api/opportunities");

const app = express();

// display error
app.use(morgan('dev'))

// Body parser middleware
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());


// DB Config
const db = require("./config/keys").mongoURI;

// Connect to MongoDB
mongoose
  .connect(db, { useNewUrlParser: true }) // Let us remove that deprecation warrning :)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

// // Use Routes for each api
app.use("/api/companies", companies)
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/opp", opportunities);


//display error

app.use((req,res,next)=>{
  const error = new Error('not found')
  error.status(401)
  next(error)

})
app.use((error,req,res,next)=>{
  res.status(error.status||500);
  res.json({
    error:{ message : error.message}
  })

})
//connect on port 3000
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));

