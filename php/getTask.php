<?php

// Ruta al archivo de la base de datos SQLite
$dbFile = 'TaskDB.db';

try {
    // Conexión a la base de datos
    $pdo = new PDO("sqlite:$dbFile");

    // Obtener el ID de la tarea desde la solicitud POST
    $taskId = $_POST['task_id'];

    // Consulta preparada para obtener la tarea por ID
    $query = "SELECT * FROM tasks WHERE task_id = :taskId";
    $stmt = $pdo->prepare($query);
    $stmt->bindParam(':taskId', $taskId);
    $stmt->execute();

    // Obtener los resultados
    $results = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Convertir los resultados a JSON
    $json = json_encode($results);

    // Establecer las cabeceras para la respuesta JSON
    header('Content-Type: application/json');

    // Imprimir el JSON
    echo $json;

    // Cerrar la conexión
    $pdo = null;
} catch (PDOException $e) {
    // Manejo de errores
    echo "Error: " . $e->getMessage();
    die();
}
?>