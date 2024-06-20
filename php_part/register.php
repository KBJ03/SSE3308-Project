<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = $_POST["userName"];
    $password = $_POST["password"];
    $email = $_POST["email"];
    $phone = $_POST["phone"];
    $gender = $_POST["gender"];
    $birthday = $_POST["birthday"];

    $regexDigit = '/\d/';
    $regexCharacter = '/[a-zA-Z]/';
    $regexSymbol = '/[-_\'.]/';
    $regexSymbols = '/[^a-zA-Z0-9]/';
    $regexCharacterLowerCase = '/[a-z]/';
    $regexCharacterUpperCase = '/[A-Z]/';

    if (empty($username) || empty($password)) {
        echo "<script>alert('Please enter the user name and password!'); window.location.href = '../register.html';</script>";
        exit; // Stop script execution
    }

    if (strlen($username) <= 3 || strlen($password) < 10) {
        echo "<script>alert('Please follow the format!'); window.location.href = '../register.html';</script>";
        exit; // Stop script execution
    }

    if (!preg_match($regexCharacter, $username) || !preg_match($regexDigit, $username) || !preg_match($regexSymbol, $username)) {
        echo "<script>alert('Please follow the format!'); window.location.href = '../register.html';</script>";
        exit; // Stop script execution
    }

    if (!preg_match($regexDigit, $password) || !preg_match($regexCharacterLowerCase, $password) || !preg_match($regexCharacterUpperCase, $password) || !preg_match($regexSymbols, $password)) {
        echo "<script>alert('Please follow the format!'); window.location.href = '../register.html';</script>";
        exit; // Stop script execution
    }

    // Hash the password
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        require_once "db.php";
        $query = "INSERT INTO User (Username, Password, Email, Phone, Gender, Birthday) VALUES (?, ?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([$username, $hashedPassword, $email, $phone, $gender, $birthday]);

        $pdo = null;
        $stmt = null;
        echo "<script>alert('Your registration is successful! You are able to enter the website'); window.location.href = '../home.html';</script>";

    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }

} else{
    header("Location: ../index.html");
}
