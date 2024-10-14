<?php
$servername = "localhost";
$username = "root";
$password = "password";
$dbname = "JobSwipeDBCon";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $surname = $_POST['surname'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $industry = $_POST['industry'];

    // Define the uploads directory
    $uploadsDir = '/Users/resetlab/JobSwiper/uploads/';

    // Handle CV upload
    $cvFileName = basename($_FILES['cv']['name']);
    $cvFilePath = $uploadsDir . $cvFileName;

    if (move_uploaded_file($_FILES['cv']['tmp_name'], $cvFilePath)) {
        // CV uploaded successfully, get the file content for BLOB
        $cvContent = addslashes(file_get_contents($cvFilePath));
    } else {
        echo "Error uploading CV.";
        exit;
    }

    // Handle Cover Letter upload
    $coverLetterFileName = basename($_FILES['cover_letter']['name']);
    $coverLetterFilePath = $uploadsDir . $coverLetterFileName;

    if (move_uploaded_file($_FILES['cover_letter']['tmp_name'], $coverLetterFilePath)) {
        // Cover letter uploaded successfully, get the file content for BLOB
        $coverLetterContent = addslashes(file_get_contents($coverLetterFilePath));
    } else {
        echo "Error uploading cover letter.";
        exit;
    }

    // Insert form data into database
    $sql = "INSERT INTO applicants (name, surname, email, password, industry, cv, cover_letter) 
            VALUES ('$name', '$surname', '$email', '$password', '$industry', '$cvContent', '$coverLetterContent')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

$conn->close();
?>
