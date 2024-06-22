<?php

// Include the database connection file
require_once "db.php";

if ($_SERVER["REQUEST_METHOD"] == "POST") {
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
        // Generate MemberID based on Username
        $memberID = generateMemberID($pdo);

        $query = "INSERT INTO User (MemberID, Username, Password, Email, Phone, Gender, Birthday) VALUES (?, ?, ?, ?, ?, ?, ?)";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([$memberID, $username, $hashedPassword, $email, $phone, $gender, $birthday]);

        $stmt = null;

        $query = "INSERT INTO Shipping (MemberID, Name, Phone, Address, PostalCode, Remark) VALUES (?, ?, ?, ?, ?, ?)";

        $stmt = $pdo->prepare($query);
        $stmt->execute([$memberID, "", "", "", "", ""]);

        $stmt = null;

        $query = "INSERT INTO Payment (MemberID, PaymentMethod, CardNumber) VALUES (?, ?, ?)";

        $stmt = $pdo->prepare($query);
        $stmt->execute([$memberID, "", ""]);

        $pdo = null;
        $stmt = null;
        echo "<script>alert('Your registration is successful! You are able to enter the website'); window.location.href = '../home.html';</script>";


        
    } catch (PDOException $e) {
        echo "Error: " . $e->getMessage();
    }

} else {
    header("Location: ../index.html");
    exit; // Stop script execution
}

// Function to generate MemberID starting with "ABC"
function generateMemberID($pdo) {
    // Prefix "ABC"
    $prefix = "ABC";

    // Check if the prefix already exists in the MemberIDSequence table
    $query = "SELECT last_id FROM MemberIDSequence WHERE prefix = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$prefix]);
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Prefix exists, increment the last_id
        $last_id = $result['last_id'] + 1;
        $updateQuery = "UPDATE MemberIDSequence SET last_id = ? WHERE prefix = ?";
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->execute([$last_id, $prefix]);
    } else {
        // Prefix does not exist, start with 1
        $last_id = 1;
        $insertQuery = "INSERT INTO MemberIDSequence (prefix, last_id) VALUES (?, ?)";
        $insertStmt = $pdo->prepare($insertQuery);
        $insertStmt->execute([$prefix, $last_id]);
    }

    // Format the last_id to be 5 digits with leading zeros
    $formatted_id = str_pad($last_id, 5, '0', STR_PAD_LEFT);

    // Combine the prefix and the formatted_id
    return $prefix . $formatted_id;
}