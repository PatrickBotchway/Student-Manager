getCourses();




async function getCourses() {
    const response = await fetch('http://localhost:3000/api/courses');
    const data = await response.json()
    data.forEach(course => {
        const div = document.createElement('div');
        const editTitleButton = document.createElement('button');
        const deleteButton = document.createElement('button');
        const editCodeButton = document.createElement('button');

        editTitleButton.textContent = 'Edit Title';
        editTitleButton.type = 'button';
        editTitleButton.id = `edit_${course.course_id}`;
        editTitleButton.className = 'editTitleButton';

        editCodeButton.textContent = 'Edit Code';
        editCodeButton.type = 'button';
        editCodeButton.id = `edit_${course.course_id}`;
        editCodeButton.className = 'editCodeButton';

 
        deleteButton.textContent = 'Delete';
        deleteButton.type = 'button';
        deleteButton.id = `delete_${course.course_id}`;
        deleteButton.className = 'deleteButton';

        deleteButton.addEventListener('click', () => {
            const userConfirmed = confirm(`I'm about to delete ${course.title} oh! 😯`);
            if (userConfirmed) {
                deleteCourse(course.course_id)
            }
        });

        editTitleButton.addEventListener('click', () => {
            const newTitle = prompt(`Please enter the new title for ${course.title}:`, course.title);
            if (newTitle) {
                editCourseTitle(course.course_id, newTitle)
            }
            else if (newTitle === null) {
                alert('Guess you changed your mind bitch ass nigga! 😒😒')
            }
            else if (newTitle === "")
                alert('I need a title! Jesus!🙄')
        });

        editCodeButton.addEventListener('click', () => {
            const newCode = prompt(`Please enter the new code for ${course.title}:`, course.code);
            if (newCode) {
                editCourseCode(course.course_id, newCode)
            }
            else if (newCode === null) {
                alert('Guess you changed your mind bitch ass nigga! 😒😒')
            }
            else if (newCode === "")
                alert('I need a code. Jesus!🙄')
        });

        div.textContent = course.title + '  ||  ' + course.code;
        div.id = 'courseObject';

        div.appendChild(editTitleButton);
        div.appendChild(editCodeButton);
        div.appendChild(deleteButton);
        document.getElementById('displayCourses').appendChild(div);
    });
};

async function editCourseTitle(courseId, newTitle) {
    try{
        const reqBody = {title: newTitle}
        const response = await fetch(`http://localhost:3000/api/courses/title/${courseId}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(reqBody)
        });
        if (response.status == 400) {
            const data = await response.json();
            const errorMessage = data.replace('"title"', 'The title') || 'Invalid Input'
            alert(errorMessage);
        }

        else if (!response.ok) {
            const data = await response.text();
            console.log('Raw error response:', data);
            alert('There was an error. We are working on it!🙂');
        }

        document.getElementById('displayCourses').textContent = "";
        getCourses();
    }

    catch (err) {
        console.error(err);
    }
}

async function editCourseCode(courseId, newCode) {
    try{
        const reqBody = {code: newCode}
        const response = await fetch(`http://localhost:3000/api/courses/code/${courseId}`, {
            method: 'put',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(reqBody)
        });
        if (response.status == 400) {
            const data = await response.json();
            const errorMessage = data.replace('"code"', 'The code') || 'Invalid Input'
            alert(errorMessage);
        }

        else if (!response.ok) {
            const data = await response.text();
            console.log('Raw error response:', data);
            alert('There was an error. We are working on it!🙂');
        }

        document.getElementById('displayCourses').textContent = "";
        getCourses();
    }

    catch (err) {
        console.error(err);
    }
}

async function deleteCourse(courseId) {
            try {
                const response = await fetch(`http://localhost:3000/api/courses/${courseId}`, {
                    method: 'DELETE'
                })
                if (!response.ok) {
                    alert('There was an error. We are working on it!🙂');
                    throw new Error(`Fetch/Http Error for deleting student. status: ${response.status}`)
                }

                document.getElementById('displayCourses').textContent = "";
                getCourses();
            }

            catch (err){
                console.error(err)
            }

}

document.getElementById('addButton').addEventListener('click', () => {
    window.location.assign('../courses/addCourse/addCourse.html')
});

document.getElementById('studentsPageButton').addEventListener('click', () => {
    window.location.assign('../students/students.html')
});