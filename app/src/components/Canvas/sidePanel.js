import React, {useContext} from 'react'
import { Row, Alert, Button } from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jQuery'

import EtherscanLink from '../etherscanLink'
import { BlockchainContext } from '../BlockchainContext'
import { coordToString, decimalToHexColour } from '../../utils/utilityFunctions'
import ManageForm from '../forms/manageForm'
import MintForm from '../forms/mintForm'

const SquareIcon = styled.div`
    border: 1px solid #000000;
    height: 32px;
    width: 32px;
    display: inline-block;
    vertical-align: middle;
    margin-right: 20px;
    margin-bottom: 20px;
    ${squareId => `background: ${squareId.background};`}
    `

const SquareName = styled.h5`
    display: inline-block;
    vertical-align: middle;
    padding-bottom: 16px;
    `

const unchosenSquare = {
    'border': 'none',
}

const SidePanel = () => {

    const { state, dispatch } = useContext(BlockchainContext)
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
        const coords = coordToString(squareId)
        console.log(squares)
        return (
            <Alert
                className = 'm-4'
                variant={squares[squareId - 1] ? ownedSquares[squareId] ? 'success' : 'danger' : 'primary'}
                dismissible
                onClose={e => {
                    $('#' + clickedSquare).css(unchosenSquare)
                    dispatch({ type: 'UNCLICK-SQUARE' })
                }}>
                <span>
                    {
                        squares[squareId - 1] ? 
                        <SquareIcon background={decimalToHexColour(squares[squareId - 1])} /> 
                        : <SquareIcon background='ffffff' />
                    }
                    
                    <SquareName> Square # {squareId} </SquareName>
                </span>
                <h6> Co-ordinates : {coords} </h6>
                <p> <i>{ squares[squareId -1] ? 'Claimed' : 'Unclaimed' } </i></p>
                { 
                    squares[squareId -1] ? 
                    <h6> Owner : { ownedSquares[squareId] ? 'You!' : 'Someone else' } <br/> Current colour : {decimalToHexColour(squares[squareId -1])} </h6>  
                    : <h6> Claim it </h6> 
                }

                <Row className='justify-content-center'>
                { squares[squareId -1] ? ownedSquares[squareId] ? <ManageForm squareId={squareId}/> : <div/> : <MintForm /> }
                </Row>
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