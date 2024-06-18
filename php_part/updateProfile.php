<?php

// Include the database connection file
include 'db.php';

// update_account.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    
    // Get form data
    $username = $_POST['username'];
    $memberId = $_POST['memberId'];
    $gender = $_POST['gender'];
    $birthday = $_POST['birthday'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    
    // Update query
    $sql = "UPDATE user SET username = :username, gender = :gender, birthday = :birthday, phone = :phone, `Email Address` = :email WHERE memberId = :memberId";
    try {
        // Prepare statement
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':memberId', $memberId);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':birthday', $birthday);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':email', $email);

        // Execute the query
        $stmt->execute();

        echo "Record updated successfully";
    } catch (PDOException $e) {
        echo "Error updating record: " . $e->getMessage();
    }

    // Close the connection
    $pdo = null;
}
?>