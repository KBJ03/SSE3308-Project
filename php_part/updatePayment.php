<?php

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $memberId = $_POST['memberId'];
    
    $paymentMethod = $_POST['payment-method'];
    $cardNumber = $_POST['card-number'];

    $sql = "UPDATE payment SET `PaymentMethod` = :paymentMethod, `CardNumber` = :cardNumber WHERE memberId = :memberId";
    try {

        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':paymentMethod', $paymentMethod);
        $stmt->bindParam(':cardNumber', $cardNumber);
        $stmt->bindParam(':memberId', $memberId);

        $stmt->execute();

        echo "Payment information updated successfully";
    } catch (PDOException $e) {
        echo "Error updating payment information: " . $e->getMessage();
    }
    
    $pdo = null;
}
?>
