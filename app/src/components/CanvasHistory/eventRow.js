import React, { useContext } from 'react'
import { Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import styled from 'styled-components'

import EtherscanLink from '../forms/etherscanLink'
import { SquareContext } from '../stateProvider'

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
    const [ setSelectedSquare ] = useContext(SquareContext)

    const handleClick = (e) => {
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