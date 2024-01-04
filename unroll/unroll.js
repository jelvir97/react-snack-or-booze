function unroll(squareArray) {
const newArr = [];

let topArrIdx = 0;
let botArrIdx = squareArray.length

let leftIdx = -1;
let rightIdx = squareArray[0].length -1

let x=0;
let y=0;
while( newArr.length < squareArray.length * squareArray[0].length){
    if(y==topArrIdx){
        for(let i = x; i <= rightIdx; i++){
            x = i
            newArr.push(squareArray[y][x])
        }
        botArrIdx-=1
        leftIdx += 1
        y+=1
        continue;
    }

    if(x==rightIdx && y!==botArrIdx){
        for(let i = y; i < botArrIdx; i++){
            y = i
            newArr.push(squareArray[y][x])
        }
        y+=1
        continue;
    }

    if(y==botArrIdx && x==rightIdx){
        for(let i = x; i >= leftIdx; i--){
            x = i
            newArr.push(squareArray[y][x])
        }
        y -= 1;
        topArrIdx += 1
        rightIdx -= 1
        continue;
    }

    if(x==leftIdx && y>topArrIdx){
        for(let i = y; i > topArrIdx; i--){
            y = i
            newArr.push(squareArray[y][x])
        }
        y-=1
        continue;
    }
}
return newArr;
}

module.exports = unroll;
