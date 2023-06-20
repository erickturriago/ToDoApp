<?php

// Ruta al archivo de la base de datos SQLite
$dbFile = 'TaskDB.db';

try {
    // Conexión a la base de datos
    $pdo = new PDO("sqlite:$dbFile");

    // ID de la tarea a eliminar
    $taskId = $_POST['task_id'];

    // Consulta preparada para eliminar la tarea
    $query = "DELETE FROM tasks WHERE task_id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$taskId]);

    // Cerrar la conexión
    $pdo = null;

    // Retornar una respuesta indicando éxito
    echo "Tarea eliminada correctamente";
} catch (PDOException $e) {
    // Manejo de errores
    echo "Error: " . $e->getMessage();
    die();
}
?>