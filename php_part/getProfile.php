<?php
require_once "db.php";
try {
    // Include the database connection file
    
   

    $memberID = 'ABC00002';
    // Fetch profile information
    $profileQuery = "SELECT * FROM User WHERE MemberID = ?";
    $profileStmt = $pdo->prepare($profileQuery);
    $profileStmt->execute([$memberID]);
    $profileData = $profileStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch shipping information
    $shippingQuery = "SELECT * FROM Shipping";
    $shippingStmt = $pdo->prepare($shippingQuery);
    $shippingStmt->execute();
    $shippingData = $shippingStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch payment information
    $paymentQuery = "SELECT * FROM Payment";
    $paymentStmt = $pdo->prepare($paymentQuery);
    $paymentStmt->execute();
    $paymentData = $paymentStmt->fetchAll(PDO::FETCH_ASSOC);

    // Fetch history information
    $historyQuery = "SELECT * FROM History";
    $historyStmt = $pdo->prepare($historyQuery);
    $historyStmt->execute();
    $historyData = $historyStmt->fetchAll(PDO::FETCH_ASSOC);

    // Combine all data into a single array
    $allData = [
        'success' => true,
        'profile' => $profileData,
        'shipping' => $shippingData,
        'payment' => $paymentData,
        'history' => $historyData
    ];

    // Set the response header to JSON
    header('Content-Type: application/json');
    echo json_encode($allData);
} catch (PDOException $e) {
    // Handle database errors
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
}
// if($_SERVER["REQUEST_METHOD"] == "POST"){
//     $data = json_decode(file_get_contents("php://input"), true);
//     $memberID = $data['MemberID'];

//     if(isset($data['MemberID'])){
        
//     }
// }


?>