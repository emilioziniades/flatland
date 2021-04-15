import { BigNumber } from 'ethers'

const bigNumberToHexColour = (bigNumber) => {
    return "#".concat(bigNumber._hex.slice(2,))
}

const bigNumberToNumber = (bigNumber) => {
	const result = BigNumber.from(bigNumber)
    return result.toNumber()
}
	
const hexColourToDecimal = (hexColour) => {

    if (hexColour.slice(1,2) === '#') {
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
export { bigNumberToHexColour, bigNumberToNumber, hexColourToDecimal, decimalToHexColour, zip };