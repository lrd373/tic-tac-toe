
// Gameboard as module
const gameboard = (() => {
    // An array of spot objects based on playSpotFactory
    let board = [];
    const _spots = document.querySelectorAll(".play-spot");
    const _winnerText = document.querySelector("#winner-text");

    let _startButton = document.querySelector("#start-button");
    _startButton.addEventListener("click", () => {
        if (gameState.isGameOn === "off") {
            _startButton.textContent = "Start over";
            gameState.setCurrentPlayer();
            gameState.isGameOn = "on";
            _winnerText.classList.add("hidden");
            clearBoard();
            checkScore();
        } else if (gameState.isGameOn === "on") {
            gameState.restartGame(_startButton);
            clearBoard();
        }
    });
    
    _spots.forEach(spot => {
        // Create obj based on DOM info and add to board array
        let id = spot.getAttribute("id");
        let row = spot.dataset.row;
        let column = spot.dataset.column;
        let state = "";
        let tempObj = playSpotFactory(id, row, column);
        tempObj.setState(state);
        board.push(tempObj);

        // Add event listener to spot in HTML
        spot.addEventListener("click", (event) => {
            if (gameState.isGameOn === "on") {
                gameState.playTurn(event.target);
                checkScore();
            }   
        });
    });

    const clearBoard = () => {
        gameboard.board.forEach(spotObj => {
            spotObj.setState("");
        });
    };
    const checkScore = () => {
        
        let xs = board.filter(spotObj => spotObj.getState() === "x");
        let os = board.filter(spotObj => spotObj.getState() === "o");

        let xNegativeSlopeDiag = xs.filter(obj => (obj.getRow() === obj.getColumn()));
        let oNegativeSlopeDiag = os.filter(obj => (obj.getRow() === obj.getColumn()));
        if (xNegativeSlopeDiag.length === 3) {
            declareWinner("x");
            return;
        } else if (oNegativeSlopeDiag.length === 3) {
            declareWinner("o");
            return;
        }

        let xPositiveSlopeDiag = xs.filter(obj => 
                (parseInt(obj.getRow()) + parseInt(obj.getColumn()) === 4));
        let oPositiveSlopeDiag = os.filter(obj => 
                (parseInt(obj.getRow()) + parseInt(obj.getColumn()) === 4));
        if (xPositiveSlopeDiag.length === 3) {
            declareWinner("x");
            return;
        } else if (oPositiveSlopeDiag.length === 3) {
            declareWinner("o");
            return;
        }
        
        // Check for matching rows or columns of X's
        for (let i=0; i<xs.length; i++) {
            let matchingRows = 1;
            let matchingColumns = 1;

            for (let j=i+1; j < xs.length; j++) {
                
                if (xs[i].getRow() === xs[j].getRow()) {
                    matchingRows++;
                    if (matchingRows >=3) {break;};
                } 
                if (xs[i].getColumn() === xs[j].getColumn()) {
                    matchingColumns++;
                    if (matchingColumns >= 3) {break;};
                }
            }
         
            // 3 where row=column or 3-1, 2-2, 1-3
            if (matchingRows === 3 || matchingColumns === 3) {
                declareWinner("x");
                return;
            }
        };

        // Check for matching rows or columns of O's
        for (let i=0; i<os.length; i++) {
            let matchingRows = 1;
            let matchingColumns = 1;
            for (let j=i+1; j < os.length; j++) {
                if (os[i].getRow() === os[j].getRow()) {
                    matchingRows++;
                    if (matchingRows >=3) {break;};
                } 
                if (os[i].getColumn() === os[j].getColumn()) {
                    matchingColumns++;
                    if (matchingColumns >= 3) {break;};
                }
            }
            // 3 where row=column or 3-1, 2-2, 1-3
            if (matchingRows === 3 || matchingColumns === 3) {
                declareWinner("o");
                return;
            }
        };
    };

    const declareWinner = (winner) => {
        _winnerText.textContent = `Player ${winner} is the winner!`;
        _winnerText.classList.remove("hidden");
        gameState.restartGame(_startButton);
    };

    return {board, checkScore, clearBoard};
})();


function playSpotFactory(spotId, row, column) {
    let _state = "";
    let _row = row;
    let _column = column;
    const id = spotId;

    const getState = () => {
        return _state;
    };

    const setState = (text) => {
        _state = text;
        thisSpot().textContent = _state;
    };

    const getRow = () => {
        return _row;
    };

    const getColumn = () => {
        return _column;
    };

    const thisSpot = () => {
        let spot = document.querySelector(`#${id}`);
        return spot;
    };

    return {getState, setState, thisSpot, getRow, getColumn, id};
}



const gameState = (() => {
    let _currentPlayer = "";
    let _currentPlayerDisplay = document.querySelector("#current-player");
    const _spots = document.querySelectorAll(".play-spot");
    let isGameOn = "off";

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
        gameState.isGameOn = "off";
    };

    const playTurn = (spotElement) => {
        let id = spotElement.getAttribute("id");
        let spotObj = gameboard.board.find(theSpot => theSpot.id === id);

        if (_currentPlayer === "x" && !spotObj.getState()) {
            spotObj.setState("x");
            setCurrentPlayer();
        } else if (_currentPlayer === "o" && !spotObj.getState()) {
            spotElement.textContent = "o";
            // Find spot in board array, update its state
            let spotObj = gameboard.board.find(theSpot => theSpot.id === id);
            spotObj.setState("o");
            setCurrentPlayer();
        } else if (_currentPlayer === ""){
            setCurrentPlayer();
        }
       
    };

    return {getCurrentPlayer, setCurrentPlayer, setDisplay, playTurn, restartGame, isGameOn};
})();


