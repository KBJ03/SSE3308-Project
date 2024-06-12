<?php

// $dsn = "mysql:dbname=id22296644_webproject;host=mysql5.000webhost.com";
// $dbusername = "id22296644_root";
// $dbpassword = "webProject123!";

$dsn = "mysql:host=localhost;dbname=webproject";
$dbusername = "root";
$dbpassword = ""; 

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$pdo->query("USE id22296644_webproject");
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}



