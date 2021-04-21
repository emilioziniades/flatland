import React, { useContext } from 'react'

import BaseForm from './baseForm'
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'

const MintForm = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { contract, squares } = state

    const mintSquare = async (input) => {

        try {
            const squareDecimal = hexColourToDecimal(input)

            let tx = await contract.mint(squareDecimal)
            await tx.wait(1)
            const squareId = squares.length + 1
            
            console.log(tx)

            dispatch({
              type: 'MINT',
              colour: squareDecimal,
              id: squareId
            })
        }
        catch (e) {
            console.log(e)
        }

    }

    return(
        <BaseForm
            callback={mintSquare}
            message= 'claim square' />

        )
}

export default MintForm