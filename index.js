const config = require("config");
const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

if (!config.get("jwtPrivateKey")) {
  console.error("FATAL ERROR: jwtPrivateKey is not defined.");
  process.exit(1);
}

mongoose
  .connect("mongodb://localhost:27017/vidly")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Couldn't connect to mongo", err));

const genres = require("./routes/genres");
const home = require("./routes/home");
const customers = require("./routes/customers");
const users = require("./routes/users");
const auth = require("./routes/auth");

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(logger);

app.use("/api/genres", genres);
app.use("/api/customers", customers);
app.use("/api/users", users);
app.use("/api/auth", auth);
app.use("/", home);

app.listen(3000, () => console.log("Listening on port 3000..."));
