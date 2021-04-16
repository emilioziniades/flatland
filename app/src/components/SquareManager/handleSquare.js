import React from 'react'
import { Row, Col, Table } from 'react-bootstrap'
import styled from 'styled-components'

import ManageForm from '../forms/manageForm'
import { decimalToHexColour, coordToString } from '../../utils/utilityFunctions'

const Square = styled.div`
    border: 0.1px solid #000000;
    text-align: center;
    height: 16px;
    width: 16px;
    margin: auto;
    ${props => `background: ${props.background};`}
    `
const TableData = styled.td`
    vertical-align: middle !important;
    text-align: center;
    
`

export const HandleSquare = (props) => {

    return (    
            <tr>
                <TableData>
                    <h4 className='m-1'> {props.squareId ? props.squareId : '-'} </h4>
                </TableData>
                <TableData>
                    <p> {coordToString(props.squareId) ? coordToString(props.squareId) : '-'} </p>
                </TableData>
                <TableData md='auto' >
                    <Square
                        background={decimalToHexColour(props.squareColour)} />
                </TableData>
                <TableData>
                    <p><i> {decimalToHexColour(props.squareColour) ? decimalToHexColour(props.squareColour) : '-'}</i></p>

                </TableData>
                <TableData>
                <ManageForm 
                    squareId= {props.squareId}
                />
                </TableData>
            </tr>)
}
