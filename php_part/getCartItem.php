<?php
require_once "db.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

   
    if (isset($data['MemberID'])) {
        $ID = $data['MemberID'];

        try {
            $query = "SELECT * FROM User join Cart on User.MemberID = Cart.MemberID join Product on Cart.ItemID = Product.ItemID where User.MemberID=:id";
            $stmt = $pdo->prepare($query);
            $stmt->execute([':id'=> $ID]);
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
