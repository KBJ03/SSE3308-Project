<?php
require_once "db.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

    if (isset($data['searchTerm'])) {
        $memberID = $data['MemberID'];

        try {
            $memberId = htmlspecialchars($_GET['MemberID']);
            // Fetch all items from the cart table
            $query = "
                SELECT Cart.ItemID, Product.ProductName, Product.Price, Product.Url
                FROM Cart
                JOIN Product ON Cart.ItemID = Product.ItemID
                WHERE Cart.MemberID = ?
            ";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$searchTerm]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            header('Content-Type: application/json');
            
        
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'results' => $result,
                ]);
            } else {
                echo json_encode([
                    'success' => false,
                    'message' => 'No results found'
                ]);
            }
        } catch (PDOException $e) {
            echo json_encode([
                'success' => false,
                'message' => 'Database error: ' . $e->getMessage()
            ]);
        }
    } else {
        echo json_encode([
            'success' => false,
            'message' => 'No itemID provided'
        ]);
    }
        
  
}
    

?>
