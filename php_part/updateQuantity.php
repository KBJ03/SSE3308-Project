<?php
// Include the database connection file
include 'db.php';

// updatePayment.php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    
    //$data = json_decode(file_get_contents("php://input"), true);
    //isset($data['itemID'])
    if (true) {
        $quantity = 3;

        // Update query
        $sql = "UPDATE quantity SET quantity = :quantity";
        try {
            // Prepare statement
            $stmt = $pdo->prepare($sql);
    
            // Bind parameters
            $stmt->bindParam(':quantity', $quantity);
    
            // Execute the query
            $stmt->execute();
    
            echo "Payment information updated successfully";
        } catch (PDOException $e) {
            echo "Error updating payment information: " . $e->getMessage();
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No itemID provided'
        ]);
    }

    

    // Close the connection
    $pdo = null;
}
?>
