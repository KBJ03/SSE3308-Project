<?php
// Include the database connection file
require_once 'db.php';
// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve the form data
    $subject = htmlentities($_POST['subject']);
    $feedback = htmlentities($_POST['feedback']);
    $memberID = htmlentities($_GET['MemberID']);

    // Validate the form data (optional but recommended)
    if (!empty($subject) && !empty($feedback)) {
        try {
            // Prepare an SQL statement to insert the data
            $stmt = $pdo->prepare("INSERT INTO Contact (MemberID, Subject, Feedback) VALUES (:MemberID, :Subject, :Feedback)");
            
            // Bind parameters to the SQL query
            $stmt->bindParam(':Subject', $subject);
            $stmt->bindParam(':Feedback', $feedback);
            $stmt->bindParam(':MemberID', $memberID);

            // Execute the statement
            $stmt->execute();

            echo "<script>alert('Your feedback are accepted successfully!'); window.location.href = '../contact.html?MemberID=$memberID';</script>";
        } catch (PDOException $e) {
            echo "Error: " . $e->getMessage();
        }
    } else {
        echo "Please fill in all fields.";
    }
}

echo "New feedback submitted successfully";
?>