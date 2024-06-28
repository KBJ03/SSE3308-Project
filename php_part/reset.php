<?php
session_start();

require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlentities($_POST['confirmUserName']);
    $email = htmlentities($_POST['confirmEmail']);
    $newPassword = htmlentities($_POST['newPassword']);
    $confirmNewPassword = htmlentities($_POST['confirmNewPassword']);

    if (empty($username) || empty($email) || empty($newPassword) || empty($confirmNewPassword)) {
        echo "<script>alert('Please fill in all fields!'); window.location.href = '../index.html';</script>";
        exit;
    }

    if ($newPassword !== $confirmNewPassword) {
        echo "<script>alert('Passwords do not match!'); window.location.href = '../index.html';</script>";
        exit;
    }

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    try {
        $sql = "SELECT * FROM User WHERE Username = :username AND Email = :email";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['username' => $username, 'email' => $email]);

        if ($stmt->rowCount() > 0) {
            $updateSql = "UPDATE User SET Password = :password WHERE Username = :username AND Email = :email";
            $updateStmt = $pdo->prepare($updateSql);
            $updateStmt->execute(['password' => $hashedPassword, 'username' => $username, 'email' => $email]);

            echo "<script>alert('Password successfully updated!'); window.location.href = '../index.html';</script>";
        } else {
            echo "<script>alert('Invalid username or email!'); window.location.href = '../index.html';</script>";
        }
    } catch (PDOException $e) {
        echo "<script>alert('Error updating password: " . $e->getMessage() . "'); window.location.href = '../index.html';</script>";
    }
} else {
    header("Location: ../index.html");
    exit();
}