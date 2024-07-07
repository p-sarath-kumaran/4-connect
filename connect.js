var playerRed = "R";
var playerYellow = "Y";
var currPlayer = playerRed;
var gameOver = false;
var board;
var rows = 6;
var columns = 7;
window.onload = function() {
    setGame();
    document.getElementById("resetButton").addEventListener("click", resetGame);
}

function setGame() {
    board = [];
    let boardElement = document.getElementById("board");
    boardElement.innerHTML = "";
    for (let r = 0; r < rows; r++) {
        let row = [];
        for (let c = 0; c < columns; c++) {
            row.push(' ');
            let cir = document.createElement("div");
            cir.id = r.toString() + "-" + c.toString();
            cir.classList.add("cir");
            cir.addEventListener("click", setPiece);
            boardElement.append(cir);
        }
        board.push(row);
    }
    document.getElementById("winner").innerText = "";
}

function setPiece() {
    if (gameOver) {
        return;
    }
    let cords = this.id.split("-");
    let r = parseInt(cords[0]);
    let c = parseInt(cords[1]);

    for (let row = rows - 1; row >= 0; row--) {
        if (board[row][c] == ' ') {
            board[row][c] = currPlayer;
            let cir = document.getElementById(row.toString() + "-" + c.toString());
            if (currPlayer == playerRed) {
                cir.classList.add("red");
            } else {
                cir.classList.add("yellow");
            }
            if (checkWinner(row, c)) {
                gameOver = true;
                let winner = (currPlayer == playerRed) ? "Red" : "Yellow";
                document.getElementById("winner").innerText = winner + " wins!";
            }
            currPlayer = (currPlayer == playerRed) ? playerYellow : playerRed;
            return;
        }
    }
}

function checkWinner(row, col) {
    return checkDirection(row, col, 1, 0) ||
           checkDirection(row, col, 0, 1) ||
           checkDirection(row, col, 1, 1) ||
           checkDirection(row, col, 1, -1);
}

function checkDirection(row, col, rowDir, colDir) {
    let count = 0;
    for (let i = -3; i <= 3; i++) {
        let r = row + i * rowDir;
        let c = col + i * colDir;
        if (r >= 0 && r < rows && c >= 0 && c < columns && board[r][c] == currPlayer) {
            count++;
            if (count == 4) {
                return true;
            }
        } else {
            count = 0;
        }
    }
    return false;
}

function resetGame() {
    currPlayer = playerRed;
    gameOver = false;
    setGame();
}
