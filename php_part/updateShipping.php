<?php

include 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    $memberId = $_POST['memberId'];
    
    $name = $_POST['shipping-name'];
    $phone = $_POST['shipping-phone'];
    $address = $_POST['shipping-address'];
    $postal = $_POST['shipping-postal'];
    $remark = $_POST['shipping-remark'];

    $sql = "UPDATE Shipping SET name = :name, phone = :phone, address = :address, PostalCode = :postal, remark = :remark WHERE memberId = :memberId";
    try {

        $stmt = $pdo->prepare($sql);

        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':phone', $phone);
        $stmt->bindParam(':address', $address);
        $stmt->bindParam(':postal', $postal);
        $stmt->bindParam(':remark', $remark);
        $stmt->bindParam(':memberId', $memberId);

        $stmt->execute();

        echo "Shipping information updated successfully";
    } catch (PDOException $e) {
        echo "Error updating shipping information: " . $e->getMessage();
    }
    $pdo = null;
}
?>
