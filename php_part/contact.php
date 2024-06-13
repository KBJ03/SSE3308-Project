<?php
// Include the database connection file
require_once 'db.php';

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the form data
    $subject = $_POST['subject'];
    $feedback = $_POST['feedback'];

    // Validate the form data (optional but recommended)
    if (!empty($subject) && !empty($feedback)) {
        try {
            // Prepare an SQL statement to insert the data
            $stmt = $pdo->prepare("INSERT INTO Contact (MemberID, Subject, Feedback) VALUES (:Subject, :Feedback)");
            
            // Bind parameters to the SQL query
            $stmt->bindParam(':Subject', $subject);
            $stmt->bindParam(':Feedback', $feedback);

            // Execute the statement
            $stmt->execute();

            echo "New feedback submitted successfully";
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Please fill in all fields.";
    }
}
?>