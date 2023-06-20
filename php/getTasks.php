<?php

// Ruta al archivo de la base de datos SQLite
$dbFile = 'TaskDB.db';

try {
    // Conexión a la base de datos
    $pdo = new PDO("sqlite:$dbFile");

    // Consulta
    $query = "SELECT * FROM tasks";
    $stmt = $pdo->query($query);

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
