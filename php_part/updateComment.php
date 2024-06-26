<?php
require_once "db.php";


if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $data = json_decode(file_get_contents("php://input"), true);

   
    if (isset($data['subject'])) {
        $memberid=$data['memberID'];
        $subject=$data['subject'];
        $comment=$data['comment'];

        try {
            $query = "INSERT INTO Comment VALUES (:subject, :Comment,:memberid)";
            $stmt = $pdo->prepare($query);
            $stmt->execute([':subject'=> $subject,'Comment'=>$comment,':memberid'=>$memberid]);
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
