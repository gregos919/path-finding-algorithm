let asciiMap1 = [
    "@---A---+",
    "        |",
    "x-B-+   C",
    "    |   |",
    "    +---+"
];

let asciiMap2 = [
    "@         ",
    "| C----+  ",
    "A |    |  ",
    "+---B--+  ",
    "  |      x",
    "  |      |",
    "  +---D--+"
]

let asciiMap3 = [
    "  @---+   ",
    "      B   ",
    "K-----|--A",
    "|     |  |",
    "|  +--E  |",
    "|  |     |",
    "+--E--Ex C",
    "   |     |",
    "   +--F--+",
];

console.log(getPathAndLetters(asciiMap1))
console.log(getPathAndLetters(asciiMap2))
console.log(getPathAndLetters(asciiMap3))

function getPathAndLetters(asciiMap) {

    let height = asciiMap.length;
    let width = asciiMap[0].length;
    let symbolsPriority = [/[+]/, /[x]/, /[|]/, /[-]/, /^[A-Z]*$/];
    let letters = "";
    let path = "@";
    let arrPathHistory = [...Array(height).fill(new Array(width + 1).join(" "))];
    let startingPointX = asciiMap[0].indexOf("@");
    let useHistory = false;
    let lastPositionVisited = startingPointX;

    function getTop (position) {
        return {
            x: position.x,
            y: position.y - 1,
            symbol: asciiMap[position.y - 1] && asciiMap[position.y - 1][position.x] ? asciiMap[position.y - 1][position.x] : ""
        };
    }

    function getRight (position) {
        return {
            x: position.x + 1,
            y: position.y,
            symbol: asciiMap[position.y] && asciiMap[position.y][position.x + 1] ? asciiMap[position.y][position.x + 1] : ""
        };
    }

     function getBottom (position) {
        return {
            x: position.x,
            y: position.y + 1,
            symbol: asciiMap[position.y + 1] && asciiMap[position.y + 1][position.y] ? asciiMap[position.y + 1][position.x] : ""
        };
    }

    function getLeft (position) {
        return {
            x: position.x - 1,
            y: position.y,
            symbol: asciiMap[position.y] && asciiMap[position.y][position.x - 1] ? asciiMap[position.y][position.x - 1] : ""
        };
    }

     function nextStep (newPosition, oldPosition) {

        let historyStringY = arrPathHistory[oldPosition.y];
        arrPathHistory[oldPosition.y] = historyStringY.substr(0, oldPosition.x) + 'x' + historyStringY.substr(oldPosition.x + 1);
        lastPositionVisited = oldPosition;
        path += newPosition.symbol;

        if (newPosition.symbol.match(/^[A-Z]*$/)) {
            letters += newPosition.symbol;
        }

        if (newPosition.symbol === "x") {
            return;
        }

        symbolsPriority.some((regex, index)=> {
            if (newPosition.symbol.match(regex)) {
                symbolsPriority.splice(index, 1);
                symbolsPriority.unshift(regex);
                return true;
            }
        });

        findPath(newPosition);
    }

    function isNextStep (positionInfo, symbol) {
        if (positionInfo.y < 0 || positionInfo.x < 0 || positionInfo.y === height || positionInfo.x === width) {
            return false;
        }

        if (lastPositionVisited.x === positionInfo.x && lastPositionVisited.y === positionInfo.y) {
            return false;
        }

        if (useHistory && positionInfo.symbol.match(symbol)) {
            useHistory = false;
            return true;
        }
        else if (arrPathHistory[positionInfo.y][positionInfo.x] !== "x" && positionInfo.symbol.match(symbol)) {
            return true;
        }
        else {
            return false;
        }
    }

    function findPath (currentPosition) {

        let isPathFound = symbolsPriority.some((symbol)=> {


            if (isNextStep(getTop(currentPosition), symbol)) {
                nextStep(getTop(currentPosition), currentPosition);
                return true;
            }

            if (isNextStep(getRight(currentPosition), symbol)) {
                nextStep(getRight(currentPosition), currentPosition)
                return true;
            }

            if (isNextStep(getBottom(currentPosition), symbol)) {
                nextStep(getBottom(currentPosition), currentPosition)
                return true
            }

            if (isNextStep(getLeft(currentPosition), symbol)) {
                nextStep(getLeft(currentPosition), currentPosition)
                return true
            }

            return false;
        });

        if (isPathFound) {
            useHistory = false;
        }
        else {
            useHistory = true;
            findPath(currentPosition);
        }
    }

    findPath({x: startingPointX, y: 0});

    return {path: path, letters: letters};
}
