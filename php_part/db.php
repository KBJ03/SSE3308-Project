<?php

$dsn = "mysql:host=localhost;dbname=id22296644_webproject";
$dbusername = "id22296644_root";
$dbpassword = "webProject123!"; 

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    //$pdo->query("USE id22296644_webproject");
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}

/*
$dsn = "mysql:host=localhost;dbname=setyourself";
$dbusername = "root";
$dbpassword = ""; 
*/
