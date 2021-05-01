import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'
import $ from 'jquery'

import { BlockchainContext } from '../../context/BlockchainContext'
import { SquareContext } from '../../context/SquareContext'
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

        let selectedSquareString = ''
        if (selectedSquare) {
            selectedSquareString = selectedSquare.toString()
        }

        for (let ownedSquare of userSquares) {
            let nodeId = '#node-' + ownedSquare[0]

            if (selectedSquareString === ownedSquare[0]) {
                $(nodeId).css(chosenSquare)
            } else {
                $(nodeId).css(unHighlightedSquare)
            }
        }
    }

    return (
        <Form>
            <Form.Check 
                type="switch"
                id='toggleOwnedSquares'
                checked = {checked}
                value="1"
                onChange={checked ? unHighlightSquares : highlightSquares}
                label={checked ?
                        'Hide Owned Squares'
                        :
                        'Highlight Owned Squares (' + userSquares.length + ')'}
            />
        </Form>
    )
}

export default ToggleOwnedSquares