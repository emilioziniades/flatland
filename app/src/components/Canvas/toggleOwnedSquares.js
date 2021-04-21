import React, { useContext, useState } from 'react'
import { ToggleButton } from 'react-bootstrap'
import $ from 'jquery'

import { BlockchainContext } from '../BlockchainContext'
import { zip } from '../../utils/utilityFunctions'


const ToggleOwnedSquares = () => {

    const { state } = useContext(BlockchainContext)
    const { ownedSquares } = state
    const userSquares = zip(ownedSquares)
    const [checked, setChecked] = useState(false)

    //I have not used inverted colours for this but it is something to consider
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
            $(nodeId).css(unHighlightedSquare)
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