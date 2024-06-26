<?php
require_once "db.php";

    if (isset($_GET['SearchTerm'])) {
        $searchTerm = htmlentities($_GET['SearchTerm']);

        try {
            $query = "SELECT * FROM Product WHERE ProductName LIKE ? ";
            $stmt = $pdo->prepare($query);
            $stmt->execute(['%' . $searchTerm . '%']);
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
        
  
    

?>
