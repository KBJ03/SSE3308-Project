<?php

$dsn = "mysql:host=localhost;dbname=id22296644_webproject";
$dbusername = "id22296644_root";
$dbpassword = "webProject123!"; 

try {
    $pdo = new PDO($dsn, $dbusername, $dbpassword);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    $pdo->query("USE id22296644_webproject");
} catch (PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
}


        $memberID = $_GET['MemberID'];

        try {
            // Fetch all items from the cart table
            $query = "
                SELECT Cart.ItemID, Cart.Quantity, Product.ProductName, Product.Price, Product.Url
                FROM Cart
                JOIN Product ON Cart.ItemID = Product.ItemID
                WHERE Cart.MemberID = ?
            ";
            $stmt = $pdo->prepare($query);
            $stmt->execute([$memberID]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            echo '';
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
   
  

?>

