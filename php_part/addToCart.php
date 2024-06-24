<?php
// add_to_cart.php

// Include the database connection file
require 'db.php';

// Check if the product ID is set in the POST data
//if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $data = json_decode(file_get_contents("php://input"), true);
    // $memberID = $data['memberID'];
    // $itemID = $data['itemID'];

    if (isset($data['itemID'])) {

        $memberID = $data['memberID'];
        $itemID = $data['itemID'];

        try {
            $query = "INSERT INTO Cart VALUES (?, ?, ?)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$memberID, $itemID, 1]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
         

         header('Content-Type: application/json');
         echo "<script>window.location.href = '../home.html';</script>";
        
         if ($result) {
            echo json_encode([
                'success' => true,
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'message' => 'No results found'
            ]);
        }
        
        } 
         catch (PDOException $e) {
            echo json_encode(["message" => "Database error: " . $e->getMessage()]);
        }
}
// } else {
//     echo json_encode(["message" => "Invalid request."]);
// }
?>
