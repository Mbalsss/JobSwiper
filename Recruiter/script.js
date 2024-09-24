document.addEventListener('DOMContentLoaded', () => {
    const userIcon = document.getElementById('user-icon');
    const dropdownContent = document.querySelector('.dropdown-content');
    const links = document.querySelectorAll('.dropdown-content ul li a');
    
    // Toggle dropdown menu visibility
    userIcon.addEventListener('click', (event) => {
        event.preventDefault();
        dropdownContent.style.display = dropdownContent.style.display === 'block' ? 'none' : 'block';
    });

    // Hide dropdown menu if clicked outside
    document.addEventListener('click', (event) => {
        // Check if click is outside the userIcon and dropdownContent
        if (!userIcon.contains(event.target) && !dropdownContent.contains(event.target)) {
            dropdownContent.style.display = 'none';
        }
    });

    // Handle active state for dropdown links
    links.forEach(link => {
        link.addEventListener('click', function(event) {
            // Prevent default action
            event.preventDefault();

            // Remove 'active' class from all links
            links.forEach(link => link.classList.remove('active'));

            // Add 'active' class to clicked link
            this.classList.add('active');
        });
    });
});

//edit profile

// Load saved data on page load
window.onload = function() {
    document.getElementById('name_display').textContent = localStorage.getItem('name') || 'Not Set';
    document.getElementById('email-display').textContent = localStorage.getItem('email') || 'Not Set';
    document.getElementById('phone-display').textContent = localStorage.getItem('phone') || 'Not Set';
    document.getElementById('role-display').textContent = localStorage.getItem('role') || 'Not Set';
    document.getElementById('responsibilities-display').textContent = localStorage.getItem('responsibilities') || 'Not Set';
    document.getElementById('language-display').textContent = localStorage.getItem('language') || 'Not Set';
};

function showEdit(field) {
    document.getElementById(`${field}-edit`).style.display = 'block';
    document.getElementById(`${field}-display`).style.display = 'none';
}

function saveEdit(field) {
    let inputValue;
    if (field === 'language') {
        inputValue = document.getElementById('language-select').value;
    } else {
        inputValue = document.getElementById(`${field}-input`).value;
    }

    // Save to localStorage
    localStorage.setItem(field, inputValue);

    // Update the display value
    document.getElementById(`${field}-display`).textContent = inputValue;

    // Hide the edit container
    document.getElementById(`${field}-edit`).style.display = 'none';
    document.getElementById(`${field}-display`).style.display = 'block';
}

function cancelEdit(field) {
    // Hide the edit container
    document.getElementById(`${field}-edit`).style.display = 'none';
    document.getElementById(`${field}-display`).style.display = 'block';
}



//sign-out function 
document.addEventListener('DOMContentLoaded', () => {
    const logoutLink = document.getElementById('logout');

    logoutLink.addEventListener('click', (event) => {
        event.preventDefault(); // Prevent the default link behavior

        // Simulate a sign-out by removing user data from localStorage (if used)
        localStorage.removeItem('userToken'); // Assuming you use a token for authentication

        // Redirect to the login page or home page after sign-out
        window.location.href = '/login'; // Update this to your login page URL
    });
});


//Recruiter landing Page

//REcruiter username 
function setRecruiterName(username) {
    // Find the span element by its ID
    const recruiterNameElement = document.getElementById('recruiter-name');
    
    // Set the text content to the recruiter's username
    recruiterNameElement.textContent = username;
}

// Example usage: call this function when the recruiter logs in
// Replace 'John Doe' with the actual username retrieved from your login system
setRecruiterName('John Doe');


// Function to show the edit form within the modal
function showEditForm() {
    document.getElementById('edit-job-form-container').style.display = 'block';
}

// Function to hide the edit form within the modal
function hideEditForm() {
    document.getElementById('edit-job-form-container').style.display = 'none';
}

// Function to open the job modal and populate it with job details
function openJobModal(jobId) {
    const modal = document.getElementById('job-modal');
    const jobItem = document.getElementById(jobId);

    // Extract job details
    const jobTitle = jobItem.querySelector('h3').textContent;
    const jobLocation = jobItem.querySelector('p').textContent.replace('Location: ', '');
    const jobDescription = `Job description for ${jobTitle}`; // Placeholder

    // Populate modal with job details
    document.getElementById('modal-job-title').textContent = jobTitle;
    document.getElementById('modal-job-location').textContent = `Location: ${jobLocation}`;
    document.getElementById('modal-job-description').textContent = jobDescription;

    // Set form values for editing
    document.getElementById('edit-job-id').value = jobId;
    document.getElementById('edit-job-title').value = jobTitle;
    document.getElementById('edit-job-location').value = jobLocation;
    document.getElementById('edit-job-description').textContent = jobDescription;

    // Show the modal
    modal.style.display = 'block';
}

// Function to close the job modal
function closeJobModal() {
    const modal = document.getElementById('job-modal');
    modal.style.display = 'none';
}

// Function to handle form submission
document.getElementById('edit-job-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting normally

    // Get form values
    const jobId = document.getElementById('edit-job-id').value;
    const jobTitle = document.getElementById('edit-job-title').value;
    const jobLocation = document.getElementById('edit-job-location').value;
    const jobDescription = document.getElementById('edit-job-description').value;

    // Update job details
    const jobItem = document.getElementById(jobId);
    jobItem.querySelector('h3').textContent = jobTitle;
    jobItem.querySelector('p').textContent = `Location: ${jobLocation}`;
    
    // Optionally update job description on the modal
    document.getElementById('modal-job-description').textContent = jobDescription;

    // Close the edit form and modal
    hideEditForm();
    closeJobModal();
});



//Post Job

function postJob() {
    location.href = 'job.html';
}

//dashboard functionality 


// Function to switch between the main tabs (Posted Jobs, Available Applicants, Message)
function showTab(tabName) {
    // Get all tab contents and hide them
    const allTabs = document.querySelectorAll('.tab-section .job-list');
    allTabs.forEach(tab => {
        tab.classList.remove('active');
    });

    // Get all tab buttons and remove active class
    const allTabButtons = document.querySelectorAll('.tabs .tab');
    allTabButtons.forEach(tab => {
        tab.classList.remove('active');
    });

    // Show the current tab and mark it as active
    document.querySelector(`.${tabName}`).classList.add('active');
    document.querySelector(`.tab[onclick="showTab('${tabName}')"]`).classList.add('active');
}

// Function to switch between open and closed jobs
function showJobList(status) {
    // Hide all job lists
    const allJobLists = document.querySelectorAll('.job-list');
    allJobLists.forEach(list => {
        list.classList.remove('active');
    });

    // Remove active class from status buttons
    const allStatusButtons = document.querySelectorAll('.job-status-tabs .status-button');
    allStatusButtons.forEach(button => {
        button.classList.remove('active');
    });

    // Show the selected job list (open or closed) and mark the button as active
    document.querySelector(`.${status}`).classList.add('active');
    document.querySelector(`.status-button[onclick="showJobList('${status}')"]`).classList.add('active');
}

// Default: Show Open Jobs by default when the page loads
document.addEventListener("DOMContentLoaded", function () {
    showJobList('open');
});
