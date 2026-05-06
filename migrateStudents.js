require('dotenv').config(); 
const bcrypt = require('bcrypt');
const db = require('./config/db');

const migrateStudents = async () => {
    const [students] = await db.execute('SELECT * FROM students WHERE user_id IS NULL');

    for(const student of students) {
        // Check if user already exists
        const [existingUser] = await db.execute(
            'SELECT * FROM users WHERE email = ?',
            [`${student.student_number}@school.com`]
        );

        if(existingUser.length > 0) {
            console.log(`User already exists for student: ${student.name}, linking...`);
            // Just link the existing user to the student
            await db.execute(
                'UPDATE students SET user_id = ? WHERE student_id = ?',
                [existingUser[0].user_id, student.student_id]
            );
            continue; // skip to next student
        }

        const hashedPassword = await bcrypt.hash(student.student_number, 10);

        const [result] = await db.execute(
            'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
            [student.name, `${student.student_number}@school.com`, hashedPassword, 'student']
        );

        await db.execute(
            'UPDATE students SET user_id = ? WHERE student_id = ?',
            [result.insertId, student.student_id]
        );

        console.log(`Migrated student: ${student.name}`);
    }

    console.log('Migration complete!');
}

migrateStudents();