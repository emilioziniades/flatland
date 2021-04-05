import { BigNumber } from "ethers"

const bigNumberToHexColour = (bigNumber) => {
    return "#".concat(bigNumber._hex.slice(2,))
}

const bigNumberToNumber = (bigNumber) => {
	const result = BigNumber.from(bigNumber)
    return result.toNumber()
}

const hexColourToDecimal = (hexColour) => {
    const hexNumber = '0x' + hexColour.slice(1,)
    const decimal = parseInt(hexNumber, 16)
	return decimal
}

export { bigNumberToHexColour, bigNumberToNumber, hexColourToDecimal };