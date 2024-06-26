<?php
// updateQuantity.php

// Check if the itemID and quantity are set in the POST data
if(isset($_POST['itemID'], $_POST['quantity'])) {
    // Sanitize the inputs
    $itemID = $_POST['itemID'];
    $quantity = $_POST['quantity'];
    $memberID = $_POST['memberID'];

    // Include the database connection file
    require_once "db.php";

    try {
        // Prepare and execute the update query
        $query = "UPDATE Cart SET Quantity = ? WHERE ItemID = ? AND MemberID = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$quantity, $itemID, $memberID]);

        // Check if the update was successful
        if($stmt->rowCount() > 0) {
            // Return success response
            echo json_encode(['success' => true]);
        } else {
            // Return error response if no rows were affected (item not found)
            echo json_encode(['success' => false, 'message' => 'Item not found']);
        }
    } catch (PDOException $e) {
        // Return error response if an exception occurred
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
} else {
    // Return error response if itemID or quantity are not set in the POST data
    echo json_encode(['success' => false, 'message' => 'ItemID and quantity are required']);
}
?>
