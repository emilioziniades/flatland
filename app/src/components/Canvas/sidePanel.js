import React, { useContext } from 'react'
import { Row, Alert, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'

import EtherscanLink from '../forms/etherscanLink'
import { BlockchainContext } from '../../context/BlockchainContext'
import { SquareContext } from '../../context/SquareContext'
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

    const { state } = useContext(BlockchainContext)
    const { connected, account, contract, squares, maxSupply, totalSupply, ownedSquares } = state || {}
    const [selectedSquare, setSelectedSquare] = useContext(SquareContext)

    const FlatlandStats = () => {
        return(
            <Alert
                className = 'm-4'
                variant='secondary'>
                <h5>
                    Flatland Smart Contract
                </h5>
                <h6>
                    { account ? <EtherscanLink hash={contract.address} type='address' abbreviate={false} message='Source: '/> : 'Source: random colours' }
                </h6>
                { connected ?
                <p>
                    # claimed squares : { totalSupply }
                    <br/>
                    # unclaimed squares : {maxSupply - totalSupply }
                    <br/>
                </p>
                : <div/> }
            </Alert>
        )
    }

    const SquareStats = () => {

        const buttonId = '#node-' + selectedSquare
        const squareColour = (squares[selectedSquare - 1] > -1 ? decimalToHexColour(squares[selectedSquare - 1]) : $(buttonId).css('background-color'))
        const coords = coordToString(selectedSquare)

        return (
            <Alert
                className = 'm-4'
                variant={(squares[selectedSquare - 1] > -1) ? (ownedSquares[selectedSquare] > -1) ? 'success' : 'danger' : 'primary'}
                dismissible
                onClose={e => {
                    $(buttonId).css(unchosenSquare)
                    setSelectedSquare(null)
                }}>

                {
                    (squares[selectedSquare - 1] > -1) ?
                        <div>
                            <span>
                                <SquareIcon background={squareColour} className='mr-2' />
                                <SquareName className='mr-auto'> Square # {selectedSquare} <Badge pill variant='info'>Claimed</Badge> </SquareName>
                            </span>
                            <br />
                            
                            <h6> Co-ordinates : {coords} </h6>
                            <h6> Owner : {(ownedSquares[selectedSquare] > -1) ? 'You!' : 'Someone else'} <br /> Current colour : {decimalToHexColour(squares[selectedSquare - 1])} </h6>
                            <Row className='justify-content-center'>
                                {account ? (ownedSquares[selectedSquare] > -1) ? <ManageForm squareId={selectedSquare} /> : <div /> : <ConnectButton />}
                                </Row>
                        </div>
	                    :
                        <div>
                            <span>
                                <SquareIcon background={squareColour} className='mr-2'/>
                                <SquareName className='mr-auto'> Square # {selectedSquare} <Badge pill variant='warning'><i>Unclaimed</i></Badge> </SquareName>
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
            { selectedSquare ? <SquareStats /> : <FlatlandStats />}
        </span>
    )
}

export default SidePanel
