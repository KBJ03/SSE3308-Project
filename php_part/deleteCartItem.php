<?php
// deleteCartItem.php

// Include the database connection file
require 'db.php';

// Check if the item ID is set in the POST data
//if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['itemID'])) {
    $itemID = $_POST['itemID'];

    try {
        // Prepare and execute the delete query
        $query = "DELETE FROM Cart WHERE ItemID = ?";
        $stmt = $pdo->prepare($query);
        $stmt->execute([$itemID]);

        // Check if any rows were affected
        if ($stmt->rowCount() > 0) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'message' => 'No item found with the given ID']);
        }
    } catch (PDOException $e) {
        echo json_encode(['success' => false, 'message' => 'Database error: ' . $e->getMessage()]);
    }
// } else {
//     echo json_encode(['success' => false, 'message' => 'Invalid request.']);
// }
?>
