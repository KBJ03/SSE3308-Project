<?php

// Include the database connection file
include 'db.php';

// updateShipping.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get memberId from header
    $memberId = $_POST['memberId'];
    
    // Get form data
    $name = $_POST['shipping-name'];
    $phone = $_POST['shipping-phone'];
    $address = $_POST['shipping-address'];
    $postal = $_POST['shipping-postal'];
    $remark = $_POST['shipping-remark'];
    
    // Update query
    $sql = "UPDATE Shipping SET name = :name, phone = :phone, address = :address, `Postal Code` = :postal, remark = :remark WHERE memberId = :memberId";
    try {
        // Prepare statement
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':postal', $postal);
        $stmt->bindParam(':remark', $remark);
        $stmt->bindParam(':memberId', $memberId);

        // Execute the query
        $stmt->execute();

        echo "Shipping information updated successfully";
    } catch (PDOException $e) {
        echo "Error updating shipping information: " . $e->getMessage();
    }

    // Close the connection
    $pdo = null;
}
?>
