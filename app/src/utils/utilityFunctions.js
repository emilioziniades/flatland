import { BigNumber } from 'ethers'

const bigNumberToHexColour = (bigNumber) => {
    return "#".concat(bigNumber._hex.slice(2,))
}

const bigNumberToNumber = (bigNumber) => {
	const result = BigNumber.from(bigNumber)
    return result.toNumber()
}
	
const hexColourToDecimal = (hexColour) => {

    if (hexColour.slice(0,1) === '#') {
        // # provided before hex colour
        const hexNumber = '0x' + hexColour.slice(1,)
        const decimal = parseInt(hexNumber, 16)
        return decimal
    }
    else {
        // colour provided without the #
        const hexNumber = '0x' + hexColour
        const decimal = parseInt(hexNumber, 16)
        return decimal
    }
}

const decimalToHexColour = (decimal) => {
    let hex = decimal.toString(16)
    while (hex.length < 6) {
        hex = 0 + hex
    }
    return '#' + hex
}

const zip = (obj) => {
    const keys = Object.keys(obj)
    const values = Object.values(obj)
    const result = keys.map((e, i) => {
        return [e, values[i]]
    })
    return result
}

const numberToCoords = (squareNumber) => {
    let squaresAcross = 16
    let xCoord = squareNumber % squaresAcross
    let yCoord = Math.trunc(squareNumber / squaresAcross) + 1
    
    if (xCoord === 0) {
        xCoord = squaresAcross
        yCoord = Math.trunc(squareNumber / squaresAcross) 
    }
    return [xCoord, yCoord]
}	


const coordToString = (squareNumber) => {
    const coordJoin = numberToCoords(squareNumber).join()
    const coordSummary = "(" + coordJoin.replace(","," , ") + ")"
    return coordSummary
}

const numbersUpTo = (number)=> {
    let result = []
    for (let i = 1 ; i <= number ; i++) {
        console.log(i)
        result.push(i)
    }
    console.log(result)
    return result
}

const getSquareColumn = (id) => {
    let result = []

    for (let i = 1; i < 16 ; i ++) {

        let distance = 16 * i
        let above = id - distance
        let below = id + distance

        result.push(above)
        result.push(below)
    }

    result = result.filter((item) => { return item > 0 && item < 256 })
    return result
}

const getSquareRow = (id) => {
    let result = []
    let yCoord = numberToCoords(id)[1]
    
    for (let i = 1; i < 16 ; i ++) {

        let left = id - i
        let right = id + i

        let leftY = numberToCoords(left)[1]
        let rightY = numberToCoords(right)[1]

        if (leftY === yCoord) {
            result.push(left)
        }
        if (rightY === yCoord) {
            result.push(right)
        }
    }
    return result
}

const invertColour = (colourDecimal) => {
    const white = 16777215
    const inverted = white - colourDecimal
    return decimalToHexColour(inverted)
}

export { bigNumberToHexColour, bigNumberToNumber, hexColourToDecimal, decimalToHexColour, zip, numberToCoords, coordToString, numbersUpTo, getSquareColumn, getSquareRow, invertColour };
