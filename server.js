const dotenv = require('dotenv').config();
const express = require('express');
const app = express();
const students = require('./routes/studentsRoute');
const cors = require('cors');
const courses = require('./routes/coursesRoute');
const enrollments = require('./routes/enrollmentRoute');
const authenticate = require('./routes/authRoute');

app.use(express.json());
app.use(cors());
app.use('/api/students', students);
app.use('/api/courses', courses);
app.use('/api/enrollments', enrollments);
app.use('/api/auth', authenticate);





app.listen(3000, () => console.log('Server is listening...'));