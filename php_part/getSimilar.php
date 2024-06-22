<?php
require_once "db.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

   
    if (isset($data['Similar1'])) {
        $similar1=$data['Similar1'];
        $similar2=$data['Similar2'];

        try {
            $query = "SELECT * FROM Product WHERE ItemID =:item1 ";
            $stmt = $pdo->prepare($query);
            $stmt->execute([':item1'=> $similar1]);
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
            
            $query = "SELECT * FROM Product WHERE ItemID = :item2";
            $stmt = $pdo->prepare($query);
            $stmt->execute([':item2'=> $similar2]);
            $result1 = $stmt->fetchAll(PDO::FETCH_ASSOC);

            header('Content-Type: application/json');
            
        
            if ($result) {
                echo json_encode([
                    'success' => true,
                    'results' => $result,
                    'result' => $result1,
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
