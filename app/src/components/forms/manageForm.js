import React, { useContext } from 'react'

import BaseForm from './baseForm'
import { BlockchainContext } from '../stateProvider'
import { hexColourToDecimal, decimalToHexColour } from '../../utils/utilityFunctions'

const ManageForm = ({ squareId }) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { contract, squares, ownedSquares } = state
    const currentColour = decimalToHexColour(squares[squareId - 1])

    const changeSquareColour = async (input) => {

        console.log(input)

        try {
            const squareDecimal = hexColourToDecimal(input)
            console.log(squareDecimal)

            const tx = await contract.changeColour(squareId, squareDecimal)
            const receipt = await tx.wait(1)

            console.log(tx)
            console.log(receipt)

            const newSquares = squares
            newSquares[squareId - 1] = squareDecimal

            const newOwnedSquares = ownedSquares
            newOwnedSquares[squareId] = squareDecimal

            dispatch({
                type: 'CHANGE',
                squares: newSquares,
                mySquares: newOwnedSquares,
            })

            return tx.hash
        }
        catch (e) {
            console.log(e)
        }

    }

    return(
        <BaseForm
            callback={changeSquareColour}
            message= 'change colour'
            key={squareId}
            currentColour={currentColour}
             />

        )
}

export default ManageForm