import React, { useContext } from 'react'

import { SquareContext } from '../stateProvider'
import FlatlandStats from './flatlandStats'
import SquareStats from './squareStats'

const SidePanel = () => {

    const {selectedSquare} = useContext(SquareContext)

    return (
        <span>
            { selectedSquare ? <SquareStats /> : <FlatlandStats />}
        </span>
    )
}

export default SidePanel
