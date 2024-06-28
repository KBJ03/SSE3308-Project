<?php

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $username = $_POST['username'];
    $memberId = $_POST['memberId'];
    $gender = $_POST['gender'];
    $birthday = $_POST['birthday'];
    $phone = $_POST['phone'];
    $email = $_POST['email'];
    $preferences = $_POST['preferences']; 
    
    $preferencesString = implode(', ', $preferences);
    
    $sql = "UPDATE User SET username = :username, gender = :gender, birthday = :birthday, phone = :phone, email = :email, preferences = :preferences WHERE memberId = :memberId";
    try {

        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':username', $username);
        $stmt->bindParam(':memberId', $memberId);
        $stmt->bindParam(':gender', $gender);
        $stmt->bindParam(':birthday', $birthday);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':email', $email);
        $stmt->bindParam(':preferences', $preferencesString);

        $stmt->execute();

        echo "Profile updated successfully";
    } catch (PDOException $e) {
        echo "Error updating record: " . $e->getMessage();
    }

    $pdo = null;
}
?>