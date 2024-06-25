<?php
session_start();

require_once 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['confirmUserName'];
    $birthday = $_POST['confirmBirthday'];
    $newPassword = $_POST['newPassword'];
    $confirmNewPassword = $_POST['confirmNewPassword'];

    if (empty($username) || empty($birthday) || empty($newPassword) || empty($confirmNewPassword)) {
        echo "<script>alert('Please fill in all fields!'); window.location.href = '../index.html';</script>";
        exit;
    }

    if ($newPassword !== $confirmNewPassword) {
        echo "<script>alert('Passwords do not match!'); window.location.href = '../index.html';</script>";
        exit;
    }

    $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT);

    try {
        $sql = "SELECT * FROM User WHERE Username = :username AND Birthday = :birthday";
        $stmt = $pdo->prepare($sql);
        $stmt->execute(['username' => $username, 'birthday' => $birthday]);

        if ($stmt->rowCount() > 0) {
            $updateSql = "UPDATE User SET Password = :password WHERE Username = :username AND Birthday = :birthday";
            $updateStmt = $pdo->prepare($updateSql);
            $updateStmt->execute(['password' => $hashedPassword, 'username' => $username, 'birthday' => $birthday]);

            echo "<script>alert('Password successfully updated!'); window.location.href = '../index.html';</script>";
        } else {
            echo "<script>alert('Invalid username or birthdate!'); window.location.href = '../index.html';</script>";
        }
    } catch (PDOException $e) {
        echo "<script>alert('Error updating password: " . $e->getMessage() . "'); window.location.href = '../index.html';</script>";
    }
} else {
    header("Location: ../index.html");
    exit();
}