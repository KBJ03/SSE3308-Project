<?php
require_once "db.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

   
    if (isset($data['subject'])) {
        $subject = $data['subject'];

        try {
            $query = "SELECT * FROM Comment join User on Comment.ID = User.MemberID WHERE subject = :subject1";
            $stmt = $pdo->prepare($query);
            $stmt->execute([':subject1'=> $subject]);
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
