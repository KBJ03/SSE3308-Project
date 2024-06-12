<?php
try {
    // Include the database connection file
    require_once "db.php";
    // Fetch profile information
    $profileQuery = "SELECT * FROM user";
    $profileStmt = $pdo->prepare($profileQuery);
    $profileStmt->execute();
    $profileData = $profileStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch shipping information
    $shippingQuery = "SELECT * FROM shipping";
    $shippingStmt = $pdo->prepare($shippingQuery);
    $shippingStmt->execute();
    $shippingData = $shippingStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch payment information
    $paymentQuery = "SELECT * FROM payment";
    $paymentStmt = $pdo->prepare($paymentQuery);
    $paymentStmt->execute();
    $paymentData = $paymentStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch history information
    $historyQuery = "SELECT * FROM history";
    $historyStmt = $pdo->prepare($historyQuery);
    $historyStmt->execute();
    $historyData = $historyStmt->fetchAll(PDO::FETCH_ASSOC);

    // Combine all data into a single array
    $data = [
        'success' => true,
        'profile' => $profileData,
        'shipping' => $shippingData,
        'payment' => $paymentData,
        'history' => $historyData
    ];

    // Set the response header to JSON
    header('Content-Type: application/json');
    echo json_encode($data);
} catch (PDOException $e) {
    // Handle database errors
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
?>