<?php

// Ruta al archivo de la base de datos SQLite
$dbFile = 'TaskDB.db';

try {
    // Conexión a la base de datos
    $pdo = new PDO("sqlite:$dbFile");

    // Datos de la tarea a insertar
    $title = $_POST['title'];
    $description = $_POST['description'];
    $statusId = $_POST['status_id'];

    // Consulta preparada para insertar la tarea
    $query = "INSERT INTO tasks (title, description, status_id, created_at, updated_at) VALUES (?, ?, ?, datetime('now'), datetime('now'))";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$title, $description, $statusId]);

    // Obtener el ID de la tarea recién insertada
    $taskId = $pdo->lastInsertId();

    // Cerrar la conexión
    $pdo = null;

    // Retornar el ID de la tarea insertada
    echo $taskId;
} catch (PDOException $e) {
    // Manejo de errores
    echo "Error: " . $e->getMessage();
    die();
}
?>