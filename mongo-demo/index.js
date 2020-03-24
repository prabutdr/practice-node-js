const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect MongoDB', err));

const courseSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: true,
    minlength: 5,
    maxlength: 255,
    // match: /pattern/,
    // lowercase: true,
    // uppercase: true,
    // trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['web', 'mobile', 'network']
  },
  author: String,
  // tags: [ String ],
  tags: {
    type: Array,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'A course should have at least one tag.'
    }
  },
  date: { type: Date, default: Date.now },
  isPublished: Boolean,
  price: {
    type: Number,
    required: function() { return this.isPublished; },
    min: 10,
    max: 200,
    get: v => Math.round(v),
    set: v => Math.round(v)
  }
});
const Course = mongoose.model('Course', courseSchema);

async function createCourse() {
  const course = new Course({
    name: 'Angular Course 3',
    category: 'web',
    author: 'Mosh',
    tags: ['node', 'frontend'],
    isPublished: true,
    price: 199
  });
  
  try {
    const result = await course.save();
    console.log(result);
  } catch(ex) {
    console.log(ex.message);
  }
}

createCourse();

async function getCourses() {
  // eq (equal)
  // ne (not equal)
  // gt (greater than)
  // gte (greater than or equal to)
  // lt (less than)
  // lte (less than or equal to)
  // in
  // nin (not in)

  // or
  // and

  const courses = await Course
    // .find({ author: 'Mosh', isPublished: true })
    // .find({ price: { $gte: 10, $lte: 20 } })
    // .find({ price: { $in: [10, 15, 20] } })
    .find({ author: /^Mosh/ }) // Regex
    // .or([ { author: 'Mosh' }, { isPublished: true } ])
    // .skip((pageNumber - 1) * pageSize) // for pagination
    .limit(10)
    .sort({ name: 1 })
    .select({ name: 1, tags: 1});
    // .count();
  console.log(courses);
}

// getCourses();

  // Approach: Query first
  // findById()
  // Modify its properties
  // save()
async function updateCourse(id) {
  const course = await Course.findById(id);
  if (!course) return;

  course.isPublished = false;
  course.author = 'Another Author';

  // course.set({
  //   isPublished: true,
  //   author: 'Another Author'
  // });
  
  const result = await course.save();
  console.log(result);
}

// Approach: Update first
// Update directly
// Optionally: get the updated document
async function updateCourse_1(id) {
  const result = await Course.update({ _id: id }, {
    $set: {
      author: 'Mosh',
      isPublished: true
    }
  });
  
  console.log(result);
}

async function updateCourse_2(id) {
  const course = await Course.findByIdAndUpdate(id, {
    $set: {
      author: 'Jason',
      isPublished: false
    }
  }, { new: true });
  
  console.log(course);
}

async function removeCourse(id) {
  const result = await Course.deleteOne({ _id: id });
  
  console.log(result);
}

// removeCourse('5e775fe0b1aec02cb490fc01');