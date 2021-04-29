import React, { useContext, useState } from 'react'
import { ToggleButton } from 'react-bootstrap'
import $ from 'jquery'

import { BlockchainContext } from '../BlockchainContext'
import { SquareContext } from '../SquareContext'
import { zip, invertColour } from '../../utils/utilityFunctions'

const ToggleOwnedSquares = () => {

    const { state } = useContext(BlockchainContext)
    const { ownedSquares, squares } = state
    const userSquares = zip(ownedSquares)
    const [checked, setChecked] = useState(false)
    const [selectedSquare] = useContext(SquareContext)
    const squareColour = (squares[selectedSquare - 1] > -1 ? squares[selectedSquare - 1] : '#ffffff')
    const invertedColour = (squares[selectedSquare - 1] > -1 ? invertColour(squareColour) : '#000000')

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }
    
    const highlightedSquare = {
        'border': '2px solid #FFD700',
    }

    const unHighlightedSquare = {
        'border': 'none',
    }

    const highlightSquares = (e) => {
        setChecked(e.currentTarget.checked)

        for (let ownedSquare of userSquares) {
            let nodeId = '#node-' + ownedSquare[0]
            $(nodeId).css(highlightedSquare)
        }
    }

    const unHighlightSquares = (e) => {
        setChecked(e.currentTarget.checked)

        for (let ownedSquare of userSquares) {
            let nodeId = '#node-' + ownedSquare[0]
            
            if (selectedSquare === ownedSquare[0]) {
                $(nodeId).css(chosenSquare)
            } else {
                $(nodeId).css(unHighlightedSquare)
            }
        }
    }

    return (
        <ToggleButton
            type="checkbox"
            variant="secondary"
            checked={checked}
            value="1"
            onChange={checked ? unHighlightSquares : highlightSquares}
        >
            {checked ?
                'Hide Owned Squares'
                :
                'Highlight Owned Squares (' + userSquares.length + ')'}
        </ToggleButton>
    )
}

export default ToggleOwnedSquares