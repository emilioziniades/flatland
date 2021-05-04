import React, { useContext } from 'react'
import styled from 'styled-components'

import { BlockchainContext, SquareContext } from '../stateProvider'
import FlatlandStats from './flatlandStats'
import SquareStats from './squareStats'

const SidePanel = () => {

    const [selectedSquare, setSelectedSquare] = useContext(SquareContext)

    return (
        <span>
            { selectedSquare ? <SquareStats /> : <FlatlandStats />}
        </span>
    )
}

export default SidePanel
