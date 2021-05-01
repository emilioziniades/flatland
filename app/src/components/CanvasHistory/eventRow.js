import React, { useContext } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'
import $ from 'jquery'

import { invertColour } from '../../utils/utilityFunctions'
import EtherscanLink from '../forms/etherscanLink'
import { SquareContext } from '../SquareContext'
import { BlockchainContext } from '../BlockchainContext'

import { Data, TableRow } from '../SquareManager/tableComponents'

const SquareIcon = styled.div`
    border: 1px solid #E2E2E2;
    height: 16px;
    width: 16px;
    display: inline-block;
    vertical-align: middle;
    ${squareId => `background: ${squareId.background};`}
    `

const EventRow = ({ data }) => {
    const { date, id, colour, topic, txId } = data

    const { state } = useContext(BlockchainContext)
    const { squares } = state
    const [selectedSquare, setSelectedSquare] = useContext(SquareContext)

    const squareColour = (squares[id - 1] > -1 ? squares[id - 1] : '#ffffff')
    const invertedColour = (squares[id - 1] > -1 ? invertColour(squareColour) : '#000000')

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }

    const handleClick = (e) => {
        $('#node-' + selectedSquare).css('border', 'none')       
        $('#node-' + id).css(chosenSquare)
        setSelectedSquare(id)
    }

    const renderTooltip = (props) => (
        <Tooltip {...props}>
            {txId}
        </Tooltip>
    )


    return(

        <TableRow>
            <Data>
                <SquareIcon background={colour} className="mr-2" />    
                <b className="mr-auto"> {topic === 'NewSquare' ? 'Square Claim' : 'Colour Change'}</b>
            </Data>

            <Data >
                <Button
                    variant='link'
                    onClick={handleClick}
                >
                    Square  <b>#{id}</b>
                </Button>
            </Data>

            <Data>
                {topic === 'NewSquare' ? 'with' : 'to'} colour <b>{colour}</b>
            </Data>

            <Data>
                <b>{date}</b>
            </Data>
            <Data>
                <OverlayTrigger
                    placement='right'
                    overlay={renderTooltip}>
                        <Button variant='link'>
                            <EtherscanLink hash={txId} type='tx' message='' abbreviate={true} />
                        </Button>
                </OverlayTrigger>
            </Data>
        </TableRow>
    )
}

export default EventRow