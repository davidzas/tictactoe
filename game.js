class TicTacToe {
  player = "X";
  board = [];
  winner = null;

  winStates = [
    [1, 2, 3], // First Row H
    [4, 5, 6], // Second Row H
    [7, 8, 9], // Third Row H
    [1, 4, 7], // First Column V
    [2, 5, 8], // Second Column V
    [3, 6, 9], // Third Column V
    [1, 5, 9], // Diagonal
    [3, 5, 7], // Diagonal
  ];
  gameRecord = {};
  constructor() {
    this.gameId = this.generateUniqueGameId();
    const { gameId, player, board, winner, gameStatus } = JSON.parse(localStorage.getItem("currentGame")) || {};
    console.log(gameId, player, board, winner, gameStatus);

    this.gameId = gameId || this.gameId;
    this.player = player || this.player;
    this.board = board || this.board;
    this.winner = winner || this.winner;
    this.gameStatus = gameStatus || "Playing";

    this.gamesRecord = localStorage.getItem("gamesRecord");
    this.gamesRecord = this.gamesRecord ? JSON.parse(this.gamesRecord) : [];
    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener("click", () => {
      this.resetGame();
    });
    this.initBoard();
  }

  generateUniqueGameId() {
    // Get current date and time
    let date = new Date().getTime();

    // If performance.now() is available, use it to get a more precise timestamp
    if (window.performance && typeof window.performance.now === "function") {
      date += performance.now(); // Use high-precision timer
    }

    // Create a random string
    let randomString = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
      let random = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (char === "x" ? random : (random & 0x3) | 0x8).toString(16);
    });

    return randomString;
  }

  resetGame() {
    this.player = "X";
    this.board = [];
    this.winner = null;
    this.gameStatus = "Playing";
    this.gameId = this.generateUniqueGameId();
    this.updateRecord();
    this.initBoard();
  }

  initBoard() {
    const tiles = document.querySelectorAll(".board-tile");
    tiles.forEach((tile) => {
      var newElement = tile.cloneNode(true);

      // Replace the old element with the new one
      tile.parentNode.replaceChild(newElement, tile);
      newElement.innerHTML = "";
      newElement.classList.remove("tile-x", "tile-o", "tile-winner");
      newElement.addEventListener("click", () => {
        this.play(newElement);
      });
    });
    const gameStatus = document.querySelector(".game-status");
    const playerTurn = document.querySelector(".player-turn");
    gameStatus.innerHTML = "Playing!!!";
    playerTurn.innerHTML = `Player ${this.player}'s turn`;
    this.gameStatus = "Playing";
    this.board.forEach((move) => {
      const tile = document.querySelector(`[data-index="${move.tile}"]`);
      tile.innerHTML = move.player;
      tile.classList.add(`tile-${move.player.toLowerCase()}`);
    });
    setTimeout(() => {
      this.checkWinner();
    }, 1);
  }

  callDraw() {
    if (this.board.length === 9 && !this.winner) {
      alert("Draw");
      this.gameOver();
      this.recordCurrentGame();
    }
  }

  play(tile) {
    if (tile.innerHTML === "" && this.gameStatus === "Playing") {
      tile.innerHTML = this.player;
      tile.classList.add(`tile-${this.player.toLowerCase()}`);
      this.board.push({
        player: this.player,
        tile: tile.dataset.index,
      });
      this.player = this.player === "X" ? "O" : "X";
      const playerTurn = document.querySelector(".player-turn");
      playerTurn.innerHTML = `Player ${this.player}'s turn`;

      this.updateRecord();
      setTimeout(() => {
        this.checkWinner();
      }, 100);
    }
  }

  gameOver() {
    this.gameStatus = "Game Over";
    const gameStatus = document.querySelector(".game-status");
    gameStatus.innerHTML = "Game Over!!!";
  }

  checkWinner() {
    const xMoves = this.board.filter((move) => move.player === "X").map((move) => parseInt(move.tile));
    const oMoves = this.board.filter((move) => move.player === "O").map((move) => parseInt(move.tile));
    console.log(xMoves, oMoves);

    this.winStates.forEach((winState) => {
      if (winState.every((index) => xMoves.includes(index))) {
        console.log("X wins");
        this.paintWinnerTiles(winState);
        this.announceWinner("X");
      } else if (winState.every((index) => oMoves.includes(index))) {
        console.log("O wins");
        this.paintWinnerTiles(winState);
        this.announceWinner("O");
      }
    });
    this.callDraw();
  }

  paintWinnerTiles(winState) {
    winState.forEach((index) => {
      const tile = document.querySelector(`[data-index="${index}"]`);
      tile.classList.add("tile-winner");
    });
  }

  announceWinner(winner) {
    this.updateRecord();

    this.winner = winner;
    this.gameOver();
    this.recordCurrentGame();
  }

  updateRecord() {
    this.gameRecord = {
      winner: this.winner,
      player: this.player,
      gameStatus: this.gameStatus,
      board: this.board,
      gameId: this.gameId,
    };
    localStorage.setItem("currentGame", JSON.stringify(this.gameRecord));
  }

  recordCurrentGame() {
    this.updateRecord();
    this.gamesRecord.push(this.gameRecord);
    localStorage.setItem("gamesRecord", JSON.stringify(this.gamesRecord));
  }
}

class TicTacToeOnline {
  player = "X";
  board = [];
  winner = null;

  winStates = [
    [1, 2, 3], // First Row H
    [4, 5, 6], // Second Row H
    [7, 8, 9], // Third Row H
    [1, 4, 7], // First Column V
    [2, 5, 8], // Second Column V
    [3, 6, 9], // Third Column V
    [1, 5, 9], // Diagonal
    [3, 5, 7], // Diagonal
  ];
  gameRecord = {};
  constructor() {
    this.resetGame();
    this.gameId = this.generateUniqueGameId();
    const { gameId, player, board, winner, gameStatus } = JSON.parse(localStorage.getItem("currentGame")) || {};
    console.log(gameId, player, board, winner, gameStatus);

    this.gameId = gameId || this.gameId;
    this.player = player || this.player;
    this.board = board || this.board;
    this.winner = winner || this.winner;
    this.gameStatus = gameStatus || "Playing";

    this.gamesRecord = localStorage.getItem("gamesRecord");
    this.gamesRecord = this.gamesRecord ? JSON.parse(this.gamesRecord) : [];
    const resetButton = document.querySelector(".reset-button");
    resetButton.addEventListener("click", () => {
      this.resetGame();
    });
    this.initBoard();
  }

  generateUniqueGameId() {
    // Get current date and time
    let date = new Date().getTime();

    // If performance.now() is available, use it to get a more precise timestamp
    if (window.performance && typeof window.performance.now === "function") {
      date += performance.now(); // Use high-precision timer
    }

    // Create a random string
    let randomString = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (char) {
      let random = (date + Math.random() * 16) % 16 | 0;
      date = Math.floor(date / 16);
      return (char === "x" ? random : (random & 0x3) | 0x8).toString(16);
    });

    return randomString;
  }

  resetGame() {
    this.player = "X";
    this.board = [];
    this.winner = null;
    this.gameStatus = "Playing";
    this.gameId = this.generateUniqueGameId();
    this.updateRecord();
    this.initBoard();
  }

  initBoard() {
    const tiles = document.querySelectorAll(".board-tile");
    tiles.forEach((tile) => {
      var newElement = tile.cloneNode(true);

      // Replace the old element with the new one
      tile.parentNode.replaceChild(newElement, tile);
      newElement.innerHTML = "";
      newElement.classList.remove("tile-x", "tile-o", "tile-winner");
      newElement.addEventListener("click", () => {
        this.play(newElement);
      });
    });
    const gameStatus = document.querySelector(".game-status");
    const playerTurn = document.querySelector(".player-turn");
    gameStatus.innerHTML = "Playing!!!";
    playerTurn.innerHTML = `Player ${this.player}'s turn`;
    this.gameStatus = "Playing";
    this.board.forEach((move) => {
      const tile = document.querySelector(`[data-index="${move.tile}"]`);
      tile.innerHTML = move.player;
      tile.classList.add(`tile-${move.player.toLowerCase()}`);
    });
    setTimeout(() => {
      this.checkWinner();
    }, 1);
  }

  callDraw() {
    if (this.board.length === 9 && !this.winner) {
      alert("Draw");
      this.gameOver();
      this.recordCurrentGame();
    }
  }

  play(tile) {
    if (tile.innerHTML === "" && this.gameStatus === "Playing" && this.player === playerCharacter) {
      tile.innerHTML = this.player;
      tile.classList.add(`tile-${this.player.toLowerCase()}`);
      this.board.push({
        player: this.player,
        tile: tile.dataset.index,
        playerID,
      });
      this.player = this.player === "X" ? "O" : "X";

      this.updateRecord();

      playMoveOnline();
    }
  }

  gameOver() {
    this.gameStatus = "Game Over";
    const gameStatus = document.querySelector(".game-status");
    gameStatus.innerHTML = "Game Over!!!";
  }

  checkWinner() {
    const xMoves = this.board.filter((move) => move.player === "X").map((move) => parseInt(move.tile));
    const oMoves = this.board.filter((move) => move.player === "O").map((move) => parseInt(move.tile));
    console.log(xMoves, oMoves);

    this.winStates.forEach((winState) => {
      if (winState.every((index) => xMoves.includes(index))) {
        console.log("X wins");
        this.paintWinnerTiles(winState);
        this.announceWinner("X");
      } else if (winState.every((index) => oMoves.includes(index))) {
        console.log("O wins");
        this.paintWinnerTiles(winState);
        this.announceWinner("O");
      }
    });
    this.callDraw();
  }

  paintWinnerTiles(winState) {
    winState.forEach((index) => {
      const tile = document.querySelector(`[data-index="${index}"]`);
      tile.classList.add("tile-winner");
    });
  }

  announceWinner(winner) {
    this.updateRecord();

    this.winner = winner;
    this.gameOver();
    this.recordCurrentGame();
  }

  updateRecord() {
    this.gameRecord = {
      winner: this.winner,
      player: this.player,
      gameStatus: this.gameStatus,
      board: this.board,
      gameId: this.gameId,
    };
    localStorage.setItem("currentGame", JSON.stringify(this.gameRecord));
  }

  recordCurrentGame() {
    this.updateRecord();
    this.gamesRecord.push(this.gameRecord);
    localStorage.setItem("gamesRecord", JSON.stringify(this.gamesRecord));
  }
}

var game = new TicTacToe();
const onlineGameStarterButton = document.getElementById("createOnlineGame");
const FS_GAME_COLLECTION = "tictactoeGames";
var isOnline = false;
var playerCharacter = "X";
var playerID = localStorage.getItem("playerID");
var onlineGameRef = null;
var onlineGame = null;
if (!playerID) {
  playerID = game.generateUniqueGameId();
  localStorage.setItem("playerID", playerID);
}
onlineGameStarterButton.addEventListener("click", () => {
  const db = window.firestoreDB;
  onlineGame = new TicTacToeOnline();

  isOnline = true;
  db.collection(FS_GAME_COLLECTION)
    .add({
      createdAt: new Date(),
      players: [{ playerID, playerCharacter }],
      game: {
        ...onlineGame.gameRecord,
      },
    })
    .then((docRef) => {
      onlineGameRef = docRef;
      console.log("Document written with ID: ", docRef.id);
      alert(`Game created with ID: ${docRef.id}`);
      updateOnlineStatus(docRef.id);
      addListenerGame(docRef);
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
    });
});

const joinOnlineGameButton = document.getElementById("joinOnlineGame");
joinOnlineGameButton.addEventListener("click", () => {
  joinOnlineGameButton.disabled = true;
  const db = window.firestoreDB;
  const gameId = document.getElementById("gameId").value;
  if (gameId == onlineGameRef?.id) {
    alert("You are already in this game");
    return;
  }
  if (!gameId) {
    alert("Please enter a game ID");
    joinOnlineGameButton.disabled = false;
    return;
  }
  console.log(gameId);

  db.collection(FS_GAME_COLLECTION)
    .doc(gameId)
    .get()
    .then((doc) => {
      if (doc.exists) {
        onlineGameRef = doc.ref;
        isOnline = true;
        playerCharacter = "O";
        updateOnlineStatus();
        const gameData = doc.data();
        console.log("Document data:", gameData);
        onlineGame = new TicTacToeOnline();
        onlineGame.gameRecord = gameData.game;
        onlineGame.board = gameData.game?.board || [];
        onlineGame.player = gameData.game?.player;
        onlineGame.winner = gameData.game?.winner;
        onlineGame.gameStatus = gameData.game?.gameStatus;
        onlineGame.gameId = gameData.game?.gameId;
        onlineGame.initBoard();

        // this.updateOnlineStatus(doc.ref.id);
        addListenerGame(doc);
      } else {
        // doc.data() will be undefined in this case
        console.log("Game not found");
        alert("Game not found");
      }
    })
    .catch((error) => {
      console.log("Error getting the game:", error);
      alert("Error getting the game");
    })
    .finally(() => {
      joinOnlineGameButton.disabled = false;
    });
});

function addListenerGame() {
  const db = window.firestoreDB;
  db.collection(FS_GAME_COLLECTION)
    .doc(onlineGameRef.id)
    .onSnapshot((doc) => {
      const gameData = doc.data();
      console.log("Current data: ", gameData);
      gameUpdates(gameData);
    });
}

function gameUpdates(gameData) {
  onlineGame.gameRecord = gameData.game;
  onlineGame.board = gameData.game?.board || [];
  onlineGame.player = gameData.game?.player;
  onlineGame.winner = gameData.game?.winner;
  onlineGame.gameStatus = gameData.game?.gameStatus;
  onlineGame.gameId = gameData.game?.gameId;
  onlineGame.initBoard();
}

function updateOnlineStatus(id) {
  const onlineInfo = document.getElementById("onlineInfo");
  const onlineStatus = document.getElementById("onlineStatus");
  if (isOnline) {
    onlineStatus.textContent = "Is Online: Yes";
    const greenDot = document.createElement("div");
    greenDot.classList.add("green-dot");
    onlineStatus.appendChild(greenDot);
    const playerCharacterDiv = document.createElement("div");
    const gameIdDiv = document.createElement("div");
    playerCharacterDiv.textContent = `You play as ${playerCharacter}`;
    gameIdDiv.textContent = `Game ID: ${id}`;
    onlineInfo.appendChild(playerCharacterDiv);
    onlineInfo.appendChild(gameIdDiv);
    const content = document.getElementById("onlineContent");
    const disconnectButton = document.createElement("button");
    disconnectButton.classList.add("bg-teal-500", "text-white", "font-bold", "py-2", "px-4", "rounded", "ml-2", "hover-button-gg");
    disconnectButton.textContent = "Disconnect";
    disconnectButton.addEventListener("click", () => {
      localStorage.removeItem("currentGame");
      window.location.reload();
    });
    content.innerHTML = "";
    content.appendChild(disconnectButton);
  } else {
    onlineStatus.innerHTML = "Is Online: No";
  }
}

function playMoveOnline() {
  const db = window.firestoreDB;
  db.collection(FS_GAME_COLLECTION)
    .doc(onlineGameRef.id)
    .update({ game: onlineGame.gameRecord })
    .then(() => {
      console.log("Document successfully updated!");
    })
    .catch((error) => {
      console.error("Error updating document: ", error);
    });
}
