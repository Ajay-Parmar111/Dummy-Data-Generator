import express from "express";
import mongoose from "mongoose";
import Employee from "./models/Employee.js";
const app = express();
const port = 3000;

mongoose.connect("mongodb://127.0.0.1:27017/company");
app.set("view engine", "ejs");

const getRandom = (arr) => {
  let rno = Math.floor(Math.random() * (arr.length - 1));
  return arr[rno];
};

app.get("/", (req, res) => {
  res.render("index", { foo: "FOO" });
});

app.get("/generate", async (req, res) => {
   await Employee.deleteMany({})
  let randomNames = ["rohan", "ajay", "rahul"];
  let randomLang = ["python", "javascript", "rust"];
  let randomCities = ["Mysore", "manali", "jalandhar"];
  for (let index = 0; index < 10; index++) {
    let e = await Employee.create({
      name: getRandom(randomNames),
      salary: Math.floor(Math.random() * 1000000),
      language: getRandom(randomLang),
      city: getRandom(randomCities),
      isManager: Math.random() > 0.5         ? true : false,
    });
  }
  res.render("index", { foo: "FOO" });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
