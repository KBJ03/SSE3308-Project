<?php
require 'db.php';

//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $memberID = $_GET['MemberID'];


        // Generate OrderID
        $orderID = generateOrderID($pdo);

        // Prepare statement for inserting into History table
        $insertStmt = $pdo->prepare("INSERT INTO History (MemberID, OrderID, ItemID, Quantity, Amount) VALUES (?, ?, ?, ?, ?)");

        // Prepare statement to fetch cart items details
        $fetchStmt = $pdo->prepare("SELECT Cart.ItemID, Cart.Quantity, Product.Price FROM Cart JOIN Product ON (Cart.ItemID = Product.ItemID) 
        WHERE Cart.MemberID = ?");
        $fetchStmt->execute([$memberID]);

        // Insert each cart item into History table
        while ($item = $fetchStmt->fetch(PDO::FETCH_ASSOC)) {
            $itemID = $item['ItemID'];
            $quantity = $item['Quantity'];
            $price = $item['Price']; // Ensure you have the price per item
            $amount = $quantity * $price; // Calculate the total amount for this item

            // Insert into History table
            $insertStmt->execute([$memberID, $orderID, $itemID, $quantity, $amount]);
        }


        $stmt = $pdo->prepare("DELETE FROM Cart WHERE MemberID = ?");

        if ($stmt->execute([$memberID])) {
            echo "<script>window.location = '../cart.php?MemberID=$memberID';</script>"; 
        } else {
            echo json_encode(["status" => "error", "message" => "Failed to delete items from cart."]);
        }

        
    
// } else {
//     echo json_encode(["status" => "error", "message" => "Invalid request method."]);
// }

function generateOrderID($pdo) {
    // Check if the last_id exists in the OrderIDSequence table
    $query = "SELECT last_id FROM OrderIDSequence";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        // Increment the last_id
        $last_id = $result['last_id'] + 1;
        $updateQuery = "UPDATE OrderIDSequence SET last_id = ?";
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->execute([$last_id]);
    } else {
        // If no entry exists, start with 1
        $last_id = 1;
        $insertQuery = "INSERT INTO OrderIDSequence (last_id) VALUES (?)";
        $insertStmt = $pdo->prepare($insertQuery);
        $insertStmt->execute([$last_id]);
    }

    // Format the last_id to be 6 digits with leading zeros
    return str_pad($last_id, 6, '0', STR_PAD_LEFT);
}



?>
