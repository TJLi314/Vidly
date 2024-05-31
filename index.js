const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const express = require("express");
const app = express();

const genres = require("./routes/genres");
const home = require("./routes/home");

app.use(express.json());
app.use(helmet());
app.use(morgan("tiny"));
app.use(logger);

app.use("/api/genres", genres);
app.use("/", home);

app.listen(3000, () => console.log("Listening on port 3000..."));
