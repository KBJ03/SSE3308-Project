<?php
// Include the database connection file
include 'db.php';

// updatePayment.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    // Get memberId from header
    $memberId = $_POST['memberId'];
    
    // Get form data
    $paymentMethod = $_POST['payment-method'];
    $cardNumber = $_POST['card-number'];


    // Update query
    $sql = "UPDATE payment SET `Payment Method` = :paymentMethod, `Card Number` = :cardNumber WHERE memberId = :memberId";
    try {
        // Prepare statement
        $stmt = $pdo->prepare($sql);

        // Bind parameters
        $stmt->bindParam(':paymentMethod', $paymentMethod);
        $stmt->bindParam(':cardNumber', $cardNumber);
        $stmt->bindParam(':memberId', $memberId);

        // Execute the query
        $stmt->execute();

        echo "Payment information updated successfully";
    } catch (PDOException $e) {
        echo "Error updating payment information: " . $e->getMessage();
    }

    // Close the connection
    $pdo = null;
}
?>
