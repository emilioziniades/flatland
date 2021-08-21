import React, { useContext } from 'react'
import { Alert, Badge } from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'

import { BlockchainContext, SquareContext } from '../stateProvider'
import { coordToString, decimalToHexColour } from '../../utils/utilityFunctions'
import ManageForm from '../forms/manageForm'
import MintForm from '../forms/mintForm'
import ConnectButton from '../Header/connectButton'

import SquareHistoryButton from '../Canvas/squareHistoryButton'


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

const SquareStats = () => {

    const { state } = useContext(BlockchainContext)
    const { account, squares, ownedSquares } = state || {}
    const { selectedSquare, setSelectedSquare } = useContext(SquareContext)

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

            { (squares[selectedSquare - 1] > -1) ?
                <div>
                    <span>
                        <SquareIcon background={squareColour} className='mr-2' />
                        <SquareName className='mr-auto'> Square # {selectedSquare} <Badge pill variant='info'>Claimed</Badge> </SquareName>
                    </span>
                    <br />
                    
                    <h6> Co-ordinates : {coords} </h6>
                    <h6> Owner : {(ownedSquares[selectedSquare] > -1) ? 'You!' : 'Someone else'} <br /> Current colour : {decimalToHexColour(squares[selectedSquare - 1])} </h6>

                    { account ? (ownedSquares[selectedSquare] > -1) ?
                        <div>
                            <ManageForm squareId={selectedSquare} />
                            <p> </p>
                            <SquareHistoryButton indexSquare = {selectedSquare} />
                        </div>
                        :
                        <SquareHistoryButton indexSquare = {selectedSquare} />
                        :
                        <ConnectButton />
                    }

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
                                                
                    { account ?
                        <div>
                            <MintForm />
                            <p> </p>
                            <SquareHistoryButton indexSquare = {selectedSquare} />
                        </div>
                        :
                        <ConnectButton />
                    }
                </div>
            }
        </Alert>
    )
}

export default SquareStats