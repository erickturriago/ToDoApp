<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./css/style.css">
    <link href='https://fonts.googleapis.com/css?family=Rubik' rel='stylesheet'>
    <script src="https://kit.fontawesome.com/31f41c2567.js" crossorigin="anonymous"></script>
    <title>To Do</title>
</head>
<body>
    <header class="header">
        <div>
            <input type="text" class="inputTask"> 
        </div>
        <button class="btnNew">New</button>
        <h3 class="message"></h3>
    </header>

    <main class="main">
        <div class="container">
            <h2>NUEVO</h2>
            <section class="section sectionNuevo" id="sectionNuevo" key="1">
                
            </section>
        </div>
        <div class="container">
            <h2>EN PROCESO</h2>
            <section class="section sectionEnProceso" id="sectionEnProceso" key="2">
                
            </section>
        </div>
        <div class="container">
            <h2>EN REVISION</h2>
            <section class="section sectionEnRevision" id="sectionEnRevision" key="3">
                
            </section>
        </div>
        <div class="container">
            <h2>FINALIZADO</h2>
            <section class="section sectionFinalizado" id="sectionFinalizado" key="4">
                
            </section>
        </div>
        <div class="modalTask modalOculto"></div>
    </main>
    <!-- <script src="./js/app.js"></script> -->
    <script src="./js/modelo.js"></script>
    <script src="./js/vista.js"></script>
    <script src="./js/controlador.js"></script>
    <script src="./js/main.js"></script>
</body>
</html>