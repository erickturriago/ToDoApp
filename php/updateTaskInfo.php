<?php

// Ruta al archivo de la base de datos SQLite
$dbFile = 'TaskDB.db';

try {
    // Conexión a la base de datos
    $pdo = new PDO("sqlite:$dbFile");

    // Datos de la tarea a actualizar
    $taskId = $_POST['task_id'];
    $tittle = $_POST['title'];
    $description = $_POST['description'];

    // Consulta preparada para actualizar el estado de la tarea
    $query = "UPDATE tasks SET title = ?,description=? WHERE task_id = ?";
    $stmt = $pdo->prepare($query);
    $stmt->execute([$tittle, $description,$taskId]);

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