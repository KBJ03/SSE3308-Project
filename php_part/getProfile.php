<?php
require_once "db.php";
try {

    if ($_SERVER["REQUEST_METHOD"] == "POST") {

        $data = json_decode(file_get_contents("php://input"), true);
        
        if (isset($data['MemberID'])) {
            $memberID = $data['MemberID'];
            
            $profileQuery = "SELECT * FROM user WHERE MemberID = ?";
            $profileStmt = $pdo->prepare($profileQuery);
            $profileStmt->execute([$memberID]);
            $profileData = $profileStmt->fetchAll(PDO::FETCH_ASSOC);

            $shippingQuery = "SELECT * FROM shipping WHERE MemberID = ?";
            $shippingStmt = $pdo->prepare($shippingQuery);
            $shippingStmt->execute([$memberID]);
            $shippingData = $shippingStmt->fetchAll(PDO::FETCH_ASSOC);

            $paymentQuery = "SELECT * FROM payment WHERE MemberID = ?";
            $paymentStmt = $pdo->prepare($paymentQuery);
            $paymentStmt->execute([$memberID]);
            $paymentData = $paymentStmt->fetchAll(PDO::FETCH_ASSOC);

            $historyQuery = "SELECT * FROM history WHERE MemberID = ?";
            $historyStmt = $pdo->prepare($historyQuery);
            $historyStmt->execute([$memberID]);
            $historyData = $historyStmt->fetchAll(PDO::FETCH_ASSOC);

            $allData = [
                'success' => true,
                'profile' => $profileData,
                'shipping' => $shippingData,
                'payment' => $paymentData,
                'history' => $historyData
            ];

            header('Content-Type: application/json');
            echo json_encode($allData);
        } else {
            throw new Exception("MemberID not provided in the request.");
        }
    } 
    // else {
    //     throw new Exception("Invalid request method.");
    // }
} catch (PDOException $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Database error: ' . $e->getMessage()
    ]);
} catch (Exception $e) {
    echo json_encode([
        'success' => false,
        'message' => 'Error: ' . $e->getMessage()
    ]);
}
