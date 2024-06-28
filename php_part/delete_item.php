<?php
// Include the database connection file
require 'db.php';

// Check if the product name is set in the POST data
if (isset($_POST['productName'])) {
    $productName = htmlentities($_POST['productName']);

    try {
        // Prepare and execute the DELETE query
        $stmt = $pdo->prepare("DELETE FROM cart WHERE productName = :productName");
        $stmt->bindParam(':productName', $productName, PDO::PARAM_STR);
        
        if ($stmt->execute()) {
            // Deletion successful
            echo json_encode(["success" => true, "message" => "Product deleted successfully!"]);
        } else {
            // Failed to delete
            echo json_encode(["success" => false, "message" => "Failed to delete product from cart."]);
        }
    } catch (PDOException $e) {
        // Database error
        echo json_encode(["success" => false, "message" => "Database error: " . $e->getMessage()]);
    }
} else {
    // Invalid request
    echo json_encode(["success" => false, "message" => "Invalid request."]);
}
?>
