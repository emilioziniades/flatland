import React, { useContext } from 'react'

import BaseForm from './baseForm'
import { BlockchainContext } from '../stateProvider'
import { hexColourToDecimal } from '../../utils/utilityFunctions'

const MintForm = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { contract, squares } = state

    const squareId = squares.length + 1

    const mintSquare = async (input) => {

        try {
            const squareDecimal = hexColourToDecimal(input)

            let tx = await contract.mint(squareDecimal)
            console.log(tx)
            await tx.wait(1)
            
            
            console.log(tx)

            dispatch({
              type: 'MINT',
              colour: squareDecimal,
              id: squareId
            })

            return tx.hash
        }
        catch (e) {
            console.log(e)
        }
        
    }

    return(
        <BaseForm
            callback={mintSquare}
            message= 'claim square'
            currentColour='#ffffff' 
            key = ''
            indexSquare = {squareId} />
        )
}

export default MintForm