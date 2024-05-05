const mongoose = require("mongoose");

mongoose
  .connect(`mongodb://localhost:27017/test`)
  .then(() => console.log("DB Connected Successfully!!!"));

const studentSchema = new mongoose.Schema({
  name: String,
  age: Number,
});
// shema methods
studentSchema.methods.getInfo = function() {
    return `Hello I am ${this.name}, and I am ${this.age} years old.`
}

const Student = mongoose.model("Student", studentSchema);

// const newStudent = new Student({
//   name: "Svetlana",
//   age: 37,
// });

// Save model instance to data base one by one
// newStudent.save().then((createdStudent) => {
//   console.log("Student saved");
//   console.log(createdStudent);
// });

// Save with static method
// Student.create({
//     name: "Tea",
//     age: 4,
// }).then(data => console.log(data));

//Get data
Student.find()
    .then(students => {
        students.forEach(student => console.log(student.getInfo()));
    });


