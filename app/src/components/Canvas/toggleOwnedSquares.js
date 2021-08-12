import React, { useContext, useState } from 'react'
import { Form } from 'react-bootstrap'

import { BlockchainContext } from '../stateProvider'
import { HighlightContext } from '../canvasContextProvider'
import { zip } from '../../utils/utilityFunctions'

const ToggleOwnedSquares = () => {

    const { state } = useContext(BlockchainContext)
    const { ownedSquares } = state
    const userSquares = zip(ownedSquares)
    const [checked, setChecked] = useState(false)

    const { highlightSquares, setHighlightSquares } = useContext(HighlightContext)


    const toggleHighlight = (e) => {
        setChecked(!checked)
        setHighlightSquares(!highlightSquares)
    }

    return (
        <Form>
            <Form.Check 
                type="switch"
                id='toggleOwnedSquares'
                checked = {checked}
                value="1"
                onChange={toggleHighlight}
                label={checked ?
                        'Hide Owned Squares'
                        :
                        'Highlight Owned Squares (' + userSquares.length + ')'}
            />
        </Form>
    )
}

export default ToggleOwnedSquares