const GameBoard = (() => {
    const winningPatterns = [{1:"",2:"",3:""},{4:"",5:"",6:""},{7:"",8:"",9:""},
                             {1:"",4:"",7:""},{2:"",5:"",8:""},{3:"",6:"",9:""},
                             {1:"",5:"",9:""},{3:"",5:"",7:""}];

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
    }
})();
