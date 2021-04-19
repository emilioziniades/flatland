import React, {useContext} from 'react'
import { Alert } from 'react-bootstrap'

import EtherscanLink from '../etherscanLink'
import { BlockchainContext } from '../BlockchainContext'
import { numberToCoords } from '../../utils/utilityFunctions'


const SidePanel = () => {

    const { state } = useContext(BlockchainContext)
    const { isSquareClicked , clickedSquare } = state

    const FlatlandStats = () => {
        return(
            <Alert variant='secondary'>
                <h5>
                    Flatland Smart Contract
                </h5>
                <h6>
                    Source: { state.contract ? <EtherscanLink address={state.contract.address} type='address' /> : 'random colours' }
                </h6>
                <p>
                    # claimed squares : {state.squares.length}
                    <br/>
                    # unclaimed squares : {state.maxSupply - state.squares.length }
                    <br/>
                    Recent activity: 
                </p>
            </Alert>
        )
    }

    const SquareStats = () => {

        const squareId = clickedSquare.split('-')[1]
        const [x, y] = numberToCoords(squareId)
        return (
            <Alert variant='info'>
                <h5> Square # {squareId} </h5>
                <h6> Co-ordinates : ({x}, {y}) </h6>
                <h6> Owner : </h6>
                <h6> Status : </h6>
            </Alert>
        )
    }
    return (
        <span>
            { isSquareClicked ? <SquareStats /> : <FlatlandStats />}
        </span>
    )
}

export default SidePanel