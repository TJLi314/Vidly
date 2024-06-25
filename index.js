const morgan = require("morgan");
const helmet = require("helmet");
const logger = require("./middleware/logger");
const express = require("express");
const mongoose = require("mongoose");
const app = express();

mongoose
  .connect("mongodb://localhost:27017/mongo-exercises")
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Couldn't connect to mongo", err));

const courseSchema = new mongoose.Schema({
  _id: String,
  name: String,
  author: String,
  tags: [String],
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: Number,
});

const Course = mongoose.model("Course", courseSchema);

async function getCourses() {
  return await Course.find().or([{ price: { $gte: 15 } }, { name: /.*by.*/ }]);
}

// getCourses().then((courses) => console.log(courses));

async function updateCourse(id) {
  //   const course = await Course.findById(id);
  //   if (!course) {
  //     return;
  //   }
  //   course.set({
  //     isPublished: true,
  //     author: "Another Author",
  //   });
  //   const result = await course.save();
  //   console.log(result);

  const result = await Course.updateOne(
    { _id: id },
    {
      $set: {
        author: "Mosh",
        isPublished: false,
      },
    }
  );

  console.log(result);
}

async function deleteCourse(id) {
  const result = await Course.findByIdAndDelete({ _id: id });
  console.log(result);
}

deleteCourse("5a6900fff467be65019a9001");

async function createCourse() {
  const course = new Course({
    name: "Angular Course",
    author: "Mosh",
    tags: ["angular", "frontend"],
    isPublished: true,
  });

  const result = await course.save();
  console.log(result);
}

// async function getCourses() {
//   const courses = await Course.find({ author: "Mosh", isPublished: true })
//     .limit(10)
//     .sort({ name: 1 })
//     .select({ name: 1, tags: 1 });
//   console.log(courses);
// }
// getCourses();

// const genres = require("./routes/genres");
// const home = require("./routes/home");

// app.use(express.json());
// app.use(helmet());
// app.use(morgan("tiny"));
// app.use(logger);

// app.use("/api/genres", genres);
// app.use("/", home);

// app.listen(3000, () => console.log("Listening on port 3000..."));
