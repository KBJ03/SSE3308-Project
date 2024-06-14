<?php
    try {
        $memberID = $_GET['MemberID'];

        require_once "db.php";
        $query = "SELECT * FROM Contact; where MemberID = ?";
        
        $stmt = $pdo->prepare($query);
        $stmt->execute([$memberID]);

        $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        header('Content-Type: application/json');
        if($result == null){
            echo json_encode([
                'success' => true,
                'results' => $result
            ]);
        }else{
            echo json_encode([
                'success' => true,
                'results' => $result
            ]);
        }
        
        
    } catch (PDOException $e) {
        echo json_encode([
            'success' => false,
            'message' => 'Database error: ' . $e->getMessage()
        ]);
    }

