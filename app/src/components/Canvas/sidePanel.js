import React, { useContext } from 'react'
import { Row, Alert, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'

import EtherscanLink from '../forms/etherscanLink'
import { BlockchainContext } from '../BlockchainContext'
import { coordToString, decimalToHexColour } from '../../utils/utilityFunctions'
import ManageForm from '../forms/manageForm'
import MintForm from '../forms/mintForm'
import ConnectButton from '../Header/connectButton'

const SquareIcon = styled.div`
    //box-shadow: 1px 1px 1px black ;
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
    const { connected, account, contract, squares, maxSupply, ownedSquares, isSquareClicked , clickedSquare } = state

    const FlatlandStats = () => {
        return(
            <Alert
                className = 'm-4'
                variant='secondary'>
                <h5>
                    Flatland Smart Contract
                </h5>
                <h6>
                    { contract ? <EtherscanLink hash={contract.address} type='address' message='Source: '/> : 'Source: random colours' }
                </h6>
                { connected ?
                <p>
                    # claimed squares : {squares.length}
                    <br/>
                    # unclaimed squares : {maxSupply - squares.length }
                    <br/>
                    Recent activity: 
                </p>
                : <div/> }
            </Alert>
        )
    }

    const SquareStats = () => {

        const squareId = clickedSquare.split('-')[1]
        const squareColour = $('#' + clickedSquare).css('background-color')
        const coords = coordToString(squareId)

        return (
            <Alert
                className = 'm-4'
                variant={(squares[squareId - 1] > -1) ? (ownedSquares[squareId] > -1) ? 'success' : 'danger' : 'primary'}
                dismissible
                onClose={e => {
                    $('#' + clickedSquare).css(unchosenSquare)
                    dispatch({ type: 'UNCLICK-SQUARE' })
                }}>

                {
                    (squares[squareId - 1] > -1) ?
                        <div>
                            <span>
                                <SquareIcon background={squareColour} />
                                <SquareName> Square # {squareId} <Badge pill variant='info'>Claimed</Badge> </SquareName>
                            </span>
                            <br />
                            
                            <h6> Co-ordinates : {coords} </h6>
                            <h6> Owner : {(ownedSquares[squareId] > -1) ? 'You!' : 'Someone else'} <br /> Current colour : {decimalToHexColour(squares[squareId - 1])} </h6>
                            <Row className='justify-content-center'>
                                {account ? (ownedSquares[squareId] > -1) ? <ManageForm squareId={squareId} /> : <div /> : <ConnectButton />}
                                </Row>
                        </div>
	                    :
                        <div>
                            <span>
                                <SquareIcon background={squareColour} />
                                <SquareName> Square # {squareId} <Badge pill variant='warning'><i>Unclaimed</i></Badge> </SquareName>
                            </span>
                            <br />
                            
                            <h6> Co-ordinates : {coords} </h6>
                            <h6> Claim it </h6>
                            <Row className='justify-content-center'>
                                {account ? <MintForm /> : <ConnectButton />}
                            </Row>
                        </div>
                }

                       
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
