<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet"> 
    <link rel="stylesheet" href="styles.css">
    <title>Tic-Tac-Toe</title>
</head>
<body>
    <header>
        <h1>Tic-Tac-Toe</h1>
        <h2 id="current-player"></h2>
        <h2 class="hidden" id="winner-text"></h2>
        <button id="start-button" type="button">Start game</button>
    </header>
    <main>
        <div id="column1">
            <div class="play-spot" id="one-one" data-column ="1" data-row="1">
              <div class="inner-text"></div>
            </div>
            <div class="play-spot" id="one-two" data-column ="1" data-row="2">
              <div class="inner-text"></div>
            </div>
            <div class="play-spot" id="one-three" data-column ="1" data-row="3">
              <div class="inner-text"></div>
            </div>
        </div>
        
        <div id="column2">
            <div class="play-spot" id="two-one" data-column ="2" data-row="1">
              <div class="inner-text"></div>
            </div>
            <div class="play-spot" id="two-two" data-column ="2" data-row="2">
              <div class="inner-text"></div>
            </div>
            <div class="play-spot" id="two-three" data-column ="2" data-row="3">
              <div class="inner-text"></div>
            </div>
        </div>
        
        <div id="column3">
            <div class="play-spot" id="three-one" data-column ="3" data-row="1">
              <div class="inner-text"></div>
            </div>
            <div class="play-spot" id="three-two" data-column ="3" data-row="2">
              <div class="inner-text"></div>
            </div>
            <div class="play-spot" id="three-three" data-column ="3" data-row="3">
              <div class="inner-text"></div>
            </div>
        </div>
        
    </main>
</body>
<script src="game.js"></script>
</html>