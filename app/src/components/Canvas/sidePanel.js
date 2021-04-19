import React, {useContext} from 'react'
import { Alert } from 'react-bootstrap'

import EtherscanLink from '../etherscanLink'
import { BlockchainContext } from '../BlockchainContext'
import { numberToCoords, decimalToHexColour } from '../../utils/utilityFunctions'
import ManageForm from '../forms/manageForm'
import MintForm from '../forms/mintForm'


const SidePanel = () => {

    const { state } = useContext(BlockchainContext)
    const { squares, ownedSquares, isSquareClicked , clickedSquare } = state

    const FlatlandStats = () => {
        return(
            <Alert variant='secondary'>
                <h5>
                    Flatland Smart Contract
                </h5>
                <h6>
                    Source: { state.contract ? <EtherscanLink address={state.contract.address} type='address' /> : 'random colours' }
                </h6>
                { state.connected ?
                <p>
                    # claimed squares : {state.squares.length}
                    <br/>
                    # unclaimed squares : {state.maxSupply - state.squares.length }
                    <br/>
                    Recent activity: 
                </p>
                : <div/> }
            </Alert>
        )
    }

    const SquareStats = () => {

        const squareId = clickedSquare.split('-')[1]
        const [x, y] = numberToCoords(squareId)
        return (
            <Alert 
                variant={ squares[squareId -1] ? ownedSquares[squareId] ? 'success' : 'danger' :'primary' }>
                <h5> Square # {squareId} </h5>
                <h6> Co-ordinates : ({x}, {y}) </h6>
                <p> <i>{ squares[squareId -1] ? 'Claimed' : 'Unclaimed' } </i></p>
                { 
                    squares[squareId -1] ? 
                    <h6> Owner : { ownedSquares[squareId] ? 'You!' : 'Someone else' } <br/> Current colour : {decimalToHexColour(squares[squareId -1])} </h6>  
                    : <h6> Claim it </h6>}

                { squares[squareId -1] ? ownedSquares[squareId] ? <ManageForm squareId={squareId}/> : <div/> : <MintForm /> }
                
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