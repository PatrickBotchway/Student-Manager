getStudents();




async function getStudents() {
    const response = await fetch('http://localhost:3000/api/students');
    const data = await response.json()
    data.forEach(student => {
        const div = document.createElement('div');
        const editButton = document.createElement('button');
        const deleteButton = document.createElement('button');

        editButton.textContent = 'Edit';
        editButton.type = 'button';
        editButton.id = `edit_${student.student_id}`;
        editButton.className = 'editButton';
 
        deleteButton.textContent = 'Delete';
        deleteButton.type = 'button';
        deleteButton.id = `delete_${student.student_id}`;
        deleteButton.className = 'deleteButton';

        deleteButton.addEventListener('click', () => {
            const userConfirmed = confirm(`I'm about to delete ${student.name} oh! 😯`);
            if (userConfirmed) {
                deleteStudent(student.student_id)
            }
        });

        editButton.addEventListener('click', () => {
            const newName = prompt(`Please enter the new name for ${student.name}:`, student.name);
            if (newName) {
                editStudent(student.student_id, newName)
            }
            else if (newName === null) {
                alert('Guess you changed your mind bitch ass nigga! 😒😒')
            }
            else if (newName === "")
                alert('I need a name. Jesus!🙄')
        });

        div.textContent = student.name;
        div.id = 'studentObject';

        div.appendChild(editButton);
        div.appendChild(deleteButton);
        document.getElementById('displayStudents').appendChild(div);
    });
};

async function deleteStudent(studentId) {
            try {
                const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
                    method: 'DELETE'
                })
                if (!response.ok) {
                    throw new Error(`Fetch/Http Error for deleting student. status: ${response.status}`)
                }

                document.getElementById('displayStudents').textContent = "";
                getStudents();
            }

            catch (err){
                console.error(err)
            }

}

document.getElementById('coursesPageButton').addEventListener('click', () => {
    window.location.assign('../courses/courses.html')
});

async function editStudent(studentId, newName) {
    try{
        const reqBody = {name: newName}
        const response = await fetch(`http://localhost:3000/api/students/${studentId}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(reqBody)
        });
        if (response.status == 400) {
            const data = await response.json();
            const errorMessage = data.replace('"name"', 'The name') || 'Invalid Input'
            alert(errorMessage);
        }

        else if (!response.ok) {
            const data = await response.text();
            console.log('Raw error response:', data);
        }

        document.getElementById('displayStudents').textContent = "";
        getStudents();
    }

    catch (err) {
        console.error(err);
    }
}

document.getElementById('addButton').addEventListener('click', () => {
    const newStudentName = prompt('Please enter the name for our new student:', "");
            if (newStudentName) {
                addStudent(newStudentName)
            }
            else if (newStudentName === null) {
                alert('Guess you changed your mind bitch ass nigga! 😒😒')
            }
            else if (newStudentName === "")
                alert('I need a name! Jesus!🙄')
});


async function addStudent(newStudentName) {
    try{
        const reqBody = {name: newStudentName}
        const response = await fetch('http://localhost:3000/api/students', {
            method: 'post',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(reqBody)
        });
        if (response.status == 400) {
            const data = await response.json();
            const errorMessage = data.replace('"name"', 'The name') || 'Invalid Input'
            alert(errorMessage);
        }

        else if (!response.ok) {
            const data = await response.text();
            console.log('Raw error response:', data);
            alert('There was an error. We are working on it!🙂');
        }

        document.getElementById('displayStudents').textContent = "";
        getStudents();
    }

    catch (err) {
        console.error(err);
    }
}

