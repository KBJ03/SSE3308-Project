<?php
require 'db.php';

//if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $memberID = $_GET['MemberID'];

        $orderID = generateOrderID($pdo);

        $insertStmt = $pdo->prepare("INSERT INTO History (MemberID, OrderID, ItemID, Quantity, Amount) VALUES (?, ?, ?, ?, ?)");

        $fetchStmt = $pdo->prepare("SELECT Cart.ItemID, Cart.Quantity, Product.Price FROM Cart JOIN Product ON (Cart.ItemID = Product.ItemID) 
        WHERE Cart.MemberID = ?");
        $fetchStmt->execute([$memberID]);

        while ($item = $fetchStmt->fetch(PDO::FETCH_ASSOC)) {
            $itemID = $item['ItemID'];
            $quantity = $item['Quantity'];
            $price = $item['Price']; 
            $amount = $quantity * $price; 

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

    $query = "SELECT last_id FROM OrderIDSequence";
    $stmt = $pdo->prepare($query);
    $stmt->execute();
    $result = $stmt->fetch(PDO::FETCH_ASSOC);

    if ($result) {
        $last_id = $result['last_id'] + 1;
        $updateQuery = "UPDATE OrderIDSequence SET last_id = ?";
        $updateStmt = $pdo->prepare($updateQuery);
        $updateStmt->execute([$last_id]);
    } else {
        $last_id = 1;
        $insertQuery = "INSERT INTO OrderIDSequence (last_id) VALUES (?)";
        $insertStmt = $pdo->prepare($insertQuery);
        $insertStmt->execute([$last_id]);
    }
    return str_pad($last_id, 6, '0', STR_PAD_LEFT);
}



?>
