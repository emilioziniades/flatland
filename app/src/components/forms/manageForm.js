import React, { useContext } from 'react'

import BaseForm from './baseForm'
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'

const ManageForm = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)

    const changeSquareColour = async (input) => {

        console.log(input)

        try {
            const squareDecimal = hexColourToDecimal(input)
            console.log(squareDecimal)

            const tx = await state.contract.changeColour(props.squareId, squareDecimal)
            const receipt = await tx.wait(1)
            console.log(tx)
            console.log(receipt)

            const newSquareArray = state.squares
            newSquareArray[props.squareId - 1] = squareDecimal

            const newOwnedSquares = state.ownedSquares
            newOwnedSquares[props.squareId] = squareDecimal

            dispatch({
                type: 'CHANGE',
                squares: newSquareArray,
                mySquares: newOwnedSquares,
            })
        }
        catch (e) {
            console.log(e)
        }

    }

    return(
        <BaseForm
            callback={changeSquareColour}
            message= 'change colour' />
        )
}

export default ManageForm