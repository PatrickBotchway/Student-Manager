document.querySelector('form').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('title').value;
    const code = document.getElementById('code').value;
    
    addNewCourse(title, code)
    
});

async function addNewCourse(title, code) {
    try {
        const reqBody = {title: title, code: code}
        const response = await fetch('http://localhost:3000/api/courses', {
            method: 'post',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify(reqBody)
        })
        console.log(response.status)

        if (response.status == 400) {
            const data = await response.json();
            const errorMessage = data.replace('"code"', 'The code').replace('"title"', 'The title') || 'Invalid Input'
            alert(errorMessage);
        }

        else if (!response.ok) {
            const data = await response.text();
            console.log('Raw error response:', data);
            alert('There was an error. We are working on it!🙂');
        }

        else if (response.ok) {
            document.getElementById('successMessage').textContent = "This was successful! Redirecting..."
            setTimeout(() => {
                location.replace('../courses.html');
            }, 3000)
        }
    }
    
    catch (err) {
        console.log(err);
    }
}