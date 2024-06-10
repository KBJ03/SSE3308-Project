<?php

if($_SERVER["REQUEST_METHOD"] == "POST"){
    $username = $_POST["userName"];
    $password = $_POST["password"];

    try {
        require_once "db.php";
        $query = "SELECT * FROM user WHERE name = ?";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([$username]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        if($result == null){
            echo "<script>alert('Authentication failed. The username does not exist');</script>";
            echo "<script>window.location = '../index.html';</script>"; 
        }else{
            $passwordDB = $result[0]["password"];
            if($password == $passwordDB){  
                header("Location: ../home.html");
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
