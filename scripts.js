const GameBoard = (() => {
    let winningPatterns = []
    let toggle = true

    return {
        editBoard: (squareId, input) => {winningPatterns.forEach(pattern => {
            if (pattern[squareId] == "") {
                pattern[squareId] = input
            }
        })},
        listBoard: () => {return winningPatterns},
        checkForWin: () => {for (let i = 0; i < winningPatterns.length; i++) {
            valuesArray = Object.values(winningPatterns[i])
            if (valuesArray.every(i => i == valuesArray[0]) && valuesArray[0] != "") {
                return valuesArray[0]
            }
        }},
        resetBoard: () => {winningPatterns = [{1:"",2:"",3:""},{4:"",5:"",6:""},{7:"",8:"",9:""},
                                                  {1:"",4:"",7:""},{2:"",5:"",8:""},{3:"",6:"",9:""},
                                                  {1:"",5:"",9:""},{3:"",5:"",7:""}]},
        toggle: () => {
            return toggle = !toggle
        }
    }
})();

const Players = (() => {
    const player1Input = document.querySelector("[data-player1-input]");
    const player2Input = document.querySelector("[data-player2-input]");

    const player1 = {"name":"", "score":0}
    const player2 = {"name":"", "score":0}

    return {
        setNames: () => {
            player1["name"] = player1Input.value
            player2["name"] = player2Input.value
            const player1Display = document.createElement("p");
            const player2Display = document.createElement("p")
        
            player1Display.textContent = player1["name"]
            player1Input.replaceWith(player1Display)
            player2Display.textContent = player2["name"]
            player2Input.replaceWith(player2Display)
        },
        setScore: () => {
            const score1 = document.querySelector("[data-score1]")
            const score2 = document.querySelector("[data-score2]")
            score1.textContent = `Score: ${player1["score"]}`
            score2.textContent = `Score: ${player2["score"]}`
        },
        player1Name: () => {return player1["name"]},
        player2Name: () => {return player2["name"]},
        declareWinner: () => {
            const winningLetter = GameBoard.checkForWin()
            winner = ""
            if (winningLetter == "X") {
                winner = Players.player1Name()
                player1["score"] += 1
            } else {
                winner = Players.player2Name()
                player2["score"] += 1
            }
            const winnerElem = document.querySelector("[data-display-winner]")
            winnerElem.textContent = `Winner: ${winner}`
        },
        resetWinner: () => {
          const winnerElem = document.querySelector("[data-display-winner]")
          winnerElem.textContent = "[Insert Winner]"   
        }
    }   
})();

const PlayGame = (() => {
    GameBoard.resetBoard()

    const grid = document.querySelectorAll("[data-square]");
    grid.forEach(square => {
        square.addEventListener("click", () => {
            if (GameBoard.toggle()) {
                square.textContent = "O"
            } else {
                square.textContent = "X"
            }
            GameBoard.editBoard(square.id, square.textContent)
            if (GameBoard.checkForWin()) {
                Players.declareWinner()
            }
        }, {once: true})
    })
});

const Initialize = (() => {
    const btn = document.querySelector("[data-button-start-reset]")
    btn.addEventListener("click", () => {
        Players.resetWinner()
        Players.setNames()
        Players.setScore()
        PlayGame()
        grid = document.querySelectorAll("[data-square]")
        grid.forEach(square => {
            square.textContent = ""
        })
    })
})();