const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mongo-exercises')
  .then(() => console.log('Connected to database'))
  .catch(err => console.log('Connection failed', err));

const courseSchema = new mongoose.Schema({
  name: String,
  author: String,
  isPublished: Boolean,
  price: Number,
  date: { type: Date, default: Date.now() },
  tags: [ String ]
});

const Course = mongoose.model('course', courseSchema);

async function getAllPublishedBackendCourses() {
  return await Course.find({ 
    isPublished: true, 
    tags: 'backend'})
    // .sort({ name: 1 })
    .sort('-name')
    // .select({ name: 1, author: 1});
    .select('name author');
}

async function getCourses_2() {
  return await Course.find({ 
    isPublished: true, 
    tags: { $in: ['backend', 'frontend']}})
    .sort({ price: -1, name: -1 })
    .select({ name: 1, author: 1, price: 1});
}

async function getCourses_3() {
  return await Course
  .find({ isPublished: true })
  .or([
    { price: { $gte: 15 } },
    { name: /.*by.*/i }])
  .select({ name: 1, author: 1, price: 1});
}

// getAllPublishedBackendCourses()
//   .then(courses => console.log(courses));

// getCourses_2().then(courses => console.log(courses));
getCourses_3().then(courses => courses.forEach(
  course => {
    console.log("Name: ", course.name);
    console.log("Author: ", course.author);
    console.log("Price: ", course.price);
    console.log("Id: ", course._id);
    console.log("");
  }
));

const id = new mongoose.Types.ObjectId();
console.log(id);
console.log(id.getTimestamp());
console.log(mongoose.Types.ObjectId.isValid('1233'));