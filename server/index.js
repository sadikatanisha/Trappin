const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const app = express();
require("dotenv").config();
const pinsRoute = require("./routes/pins");
const usersRoute = require("./routes/users");
app.use(express.json());

app.use(cors());

app.use("/api/pins", pinsRoute);
app.use("/api/users", usersRoute);

mongoose
  .connect(process.env.MONGO_URI)
  .then(
    app.listen(process.env.PORT, () =>
      console.log(`server is running on port ${process.env.PORT}`)
    )
  )
  .catch((error) => {
    console.log(error);
  });
