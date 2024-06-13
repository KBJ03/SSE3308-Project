<?php
// Include the database connection file
require_once "db.php";

// Check if form data was submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Retrieve form data
    $profileData = [
        'username' => $_POST["username"],
        'email' => $_POST["email"],
        'phone' => $_POST["phone"]
    ];

    $shippingData = [
        'name' => $_POST["shipping_name"],
        'phone' => $_POST["shipping_phone"],
        'address' => $_POST["shipping_address"],
        'postal_code' => $_POST["shipping_postal_code"],
        'remark' => $_POST["shipping_remark"]
    ];

    $paymentData = [
        'payment_method' => $_POST["payment_method"],
        'card_number' => $_POST["card_number"]
    ];

    try {
        // Start a transaction
        $pdo->beginTransaction();

        // Update profile information
        $profileQuery = "UPDATE user SET username = :username, email = :email, phone = :phone WHERE user_id = :user_id";
        $profileStmt = $pdo->prepare($profileQuery);
        $profileStmt->bindParam(':username', $profileData['username']);
        $profileStmt->bindParam(':email', $profileData['email']);
        $profileStmt->bindParam(':phone', $profileData['phone']);
        $profileStmt->bindParam(':user_id', $_SESSION['user_id']);
        $profileStmt->execute();

        // Update shipping information
        $shippingQuery = "UPDATE shipping SET name = :name, phone = :phone, address = :address, postal_code = :postal_code, remark = :remark WHERE user_id = :user_id";
        $shippingStmt = $pdo->prepare($shippingQuery);
        $shippingStmt->bindParam(':name', $shippingData['name']);
        $shippingStmt->bindParam(':phone', $shippingData['phone']);
        $shippingStmt->bindParam(':address', $shippingData['address']);
        $shippingStmt->bindParam(':postal_code', $shippingData['postal_code']);
        $shippingStmt->bindParam(':remark', $shippingData['remark']);
        $shippingStmt->bindParam(':user_id', $_SESSION['user_id']);
        $shippingStmt->execute();

        // Update payment information
        $paymentQuery = "UPDATE payment SET payment_method = :payment_method, card_number = :card_number WHERE user_id = :user_id";
        $paymentStmt = $pdo->prepare($paymentQuery);
        $paymentStmt->bindParam(':payment_method', $paymentData['payment_method']);
        $paymentStmt->bindParam(':card_number', $paymentData['card_number']);
        $paymentStmt->bindParam(':user_id', $_SESSION['user_id']);
        $paymentStmt->execute();

        // Commit the transaction
        $pdo->commit();

        echo json_encode([
            'success' => true,
            'message' => 'Profile, shipping, and payment information updated successfully'
        ]);
    } catch (PDOException $e) {
        // Rollback the transaction if an error occurs
        $pdo->rollBack();

        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }
} else {
    // If the request method is not POST, return an error
    echo json_encode([
        'success' => false,
        'message' => 'Invalid request method'
    ]);
}
?>