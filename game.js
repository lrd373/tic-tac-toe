// Add functionality that:
// 1 -- determines winner
// 2 -- displays winner
// 3 -- ends and clears game
// 4 -- resets all HTML and functions



// Gameboard as module
const gameboard = (() => {

    let board = [];
    const _spots = document.querySelectorAll(".play-spot");

    let _startButton = document.querySelector("#start-button");
    _startButton.addEventListener("click", () => {
        if (gameState.getCurrentPlayer() === "") {
            _startButton.textContent = "Start over";
            gameState.setCurrentPlayer();
        } else {
            board = [];
            gameState.restartGame(_startButton);
        }
    });
    
    
    _spots.forEach(spot => {
        // Create obj based on DOM info and add to board array
        let id = spot.getAttribute("id");
        let state = spot.textContent;
        let tempObj = playSpotFactory(id);
        tempObj.setState(state);
        board.push(tempObj);

        // Add event listener to spot in HTML
        spot.addEventListener("click", (event) => {
            gameState.playTurn(event.target);
        });
    });
    return {board};
})();

// Players as factory function
function playerFactory() {
    return {symbol};
}

function playSpotFactory(id) {
    let _state = "";
    let _thisSpot = document.querySelector(`#${id}`);
    
    const getState = () => {
        return _thisSpot.textContent;
    };
    const setState = (text) => {
        _state = text;
    };

    return {getState, setState, id};
}



const gameState = (() => {
    let _currentPlayer = "";
    let _currentPlayerDisplay = document.querySelector("#current-player");
    const _spots = document.querySelectorAll(".play-spot");

    const getCurrentPlayer = () => {
        return _currentPlayer;
    };

    const setCurrentPlayer = () => {
        if (_currentPlayer === "o" ) {
            _currentPlayer = "x";
        } else if (_currentPlayer === "x") {
            _currentPlayer = "o";
        } else {
            let _randomNum = Math.ceil(Math.random() * 2);
            _randomNum % 2 === 0 ? _currentPlayer = "x" : _currentPlayer = "o";
        }
        _currentPlayerDisplay.textContent = `It's your turn ${_currentPlayer}`;
    };

    const setDisplay = (text) => {
        _currentPlayerDisplay.textContent = text;
    };

    const restartGame = (button) => {
        setDisplay("");
        button.textContent = "Start game";
        _currentPlayer = "";
        _spots.forEach(spot => {
            spot.textContent = "";
        });
    };

    const playTurn = (spotElement) => {
        let id = spotElement.getAttribute("id");

        if (_currentPlayer === "x" && !spotElement.textContent) {
            spotElement.textContent = "x";
            // Find spot in board array, update its state
            let spotObj = gameboard.board.find(theSpot => theSpot.id === id);
            spotObj.setState("x");
            setCurrentPlayer();
        } else if (_currentPlayer === "o" && !spotElement.textContent) {
            spotElement.textContent = "o";
            // Find spot in board array, update its state
            let spotObj = gameboard.board.find(theSpot => theSpot.id === id);
            spotObj.setState("o");
            setCurrentPlayer();
        } else if (_currentPlayer === ""){
            setCurrentPlayer();
        }
       
    };

    return {getCurrentPlayer, setCurrentPlayer, setDisplay, playTurn, restartGame};
})();


