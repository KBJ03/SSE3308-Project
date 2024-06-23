<?php
// add_to_cart.php

// Include the database connection file
require 'db.php';

// Get the raw POST data
$postData = file_get_contents("php://input");
$request = json_decode($postData, true);

// Check if the product ID is set in the POST data
if (isset($request['id'])) {
    $productID = $request['id'];

    try {
        // Fetch product details from the product table
        $stmt = $pdo->prepare("SELECT ProductName, Price FROM product WHERE productID = :productID");
        $stmt->bindParam(':productID', $productID, PDO::PARAM_INT);
        $stmt->execute();
        $product = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($product) {
            // Insert product details into the cart table
            $insertStmt = $pdo->prepare("INSERT INTO cart (productName, price) VALUES (:productName, :price)");
            $insertStmt->bindParam(':productName', $product['ProductName'], PDO::PARAM_STR);
            $insertStmt->bindParam(':price', $product['Price'], PDO::PARAM_STR);

            if ($insertStmt->execute()) {
                echo json_encode(["message" => "Product added to cart successfully!"]);
            } else {
                echo json_encode(["message" => "Failed to add product to cart."]);
            }
        } else {
            echo json_encode(["message" => "Product not found."]);
        }
    } catch (PDOException $e) {
        echo json_encode(["message" => "Database error: " . $e->getMessage()]);
    }
} else {
    echo json_encode(["message" => "Invalid request."]);
}
?>
