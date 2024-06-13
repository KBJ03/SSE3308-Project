<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = $_POST["userName"];
    $password = $_POST["password"];

    $regexDigit = '/\d/';
    $regexCharacter = '/[a-zA-Z]/';
    $regexSymbol = '/[-_\'.]/';
    $regexSymbols = '/[^a-zA-Z0-9]/';
    $regexCharacterLowerCase = '/[a-z]/';
    $regexCharacterUpperCase = '/[A-Z]/';

    if (empty($username) || empty($password)) {
        echo "<script>alert('Please enter the user name and password!'); window.location.href = '../index.html';</script>";
        exit; // Stop script execution
    }

    if (strlen($username) <= 3 || strlen($password) < 10) {
        echo "<script>alert('Please follow the format!'); window.location.href = '../index.html';</script>";
        exit; // Stop script execution
    }

    if (!preg_match($regexCharacter, $username) || !preg_match($regexDigit, $username) || !preg_match($regexSymbol, $username)) {
        echo "<script>alert('Please follow the format!'); window.location.href = '../index.html';</script>";
        exit; // Stop script execution
    }

    if (!preg_match($regexDigit, $password) || !preg_match($regexCharacterLowerCase, $password) || !preg_match($regexCharacterUpperCase, $password) || !preg_match($regexSymbols, $password)) {
        echo "<script>alert('Please follow the format!'); window.location.href = '../index.html';</script>";
        exit; // Stop script execution
    }


    try {
        require_once "db.php";
        $query = "SELECT MemberID, Username, Password FROM User WHERE Username = ?";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([$username]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($result == null){
            echo "<script>alert('Authentication failed. The username does not exist');</script>";
            echo "<script>window.location = '../index.html';</script>"; 
        }else{
            $passwordDB = $result[0]["Password"];
            if($password == $passwordDB){  
                $ID = $result[0]["MemberID"];
                $url = "Location: ../home.html?MemberID=$ID";
                header($url);
            }else{
                echo "<script>alert('Authentication failed. The username and password are not match');</script>";
                echo "<script>window.location = '../index.html';</script>"; 
            }
        }
        
        
    } catch (PDOException $e) {
        die("Query failed: " . $e->getMessage());
    }

} else{
    header("Location: ../home.html");
}
