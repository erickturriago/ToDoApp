<?php

// Ruta al archivo de la base de datos SQLite
$dbFile = 'TaskDB.db';

try {
    // Conexión a la base de datos
    $pdo = new PDO("sqlite:$dbFile");

    // Datos de la tarea a actualizar
    $taskId = $_POST['task_id'];
    $newStatusId = $_POST['new_status_id'];

    // Consulta preparada para actualizar el estado de la tarea
    $query = "UPDATE tasks SET status_id = ? WHERE task_id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$newStatusId, $taskId]);

    // Cerrar la conexión
    $pdo = null;

    // Retornar una respuesta indicando éxito
    echo "Estado de la tarea actualizado correctamente";
} catch (PDOException $e) {
    // Manejo de errores
    echo "Error: " . $e->getMessage();
    die();
}
?>