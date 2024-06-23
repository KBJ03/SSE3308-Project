<?php
require 'db.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $itemIds = $_POST['itemIds'];

    if (!empty($itemIds)) {
        $placeholders = implode(',', array_fill(0, count($itemIds), '?'));
        $stmt = $pdo->prepare("DELETE FROM cart WHERE productID IN ($placeholders)");

        if ($stmt->execute($itemIds)) {
            echo json_encode(["status" => "success"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete items from cart."]);
        }
    } else {
        echo json_encode(["status" => "error", "message" => "No items to delete."]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method."]);
}
?>
