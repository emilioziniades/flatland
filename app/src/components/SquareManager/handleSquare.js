import React, {useContext} from 'react'
import styled from 'styled-components'
import $ from 'jquery'

import ManageForm from '../forms/manageForm'
import { decimalToHexColour, coordToString, invertColour } from '../../utils/utilityFunctions'
import { BlockchainContext } from '../BlockchainContext'


const Square = styled.button`
    border: 0.1px solid #000000;
    text-align: center;
    height: 20px;
    width: 20px;
    margin: auto;
    ${props => `background: ${props.background};`}
    `
const TableData = styled.td`
    vertical-align: middle !important;
    text-align: center;
    
`

const HandleSquare = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { squares, isSquareClicked, clickedSquare } = state
    const invertedColour = invertColour(props.squareColour)

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }

    const handleClick = (e) => {
        
        const indexSquare = 'node-'.concat(props.squareId)
        console.log(indexSquare)

        if (isSquareClicked && clickedSquare !== indexSquare) {
            $('#' + clickedSquare).css('border', 'none')
            $('#' + indexSquare).css(chosenSquare)
            dispatch({ type: 'CLICK-SQUARE', clickedSquare: indexSquare })
        }
        else {
            //No square is clicked
            $('#' + indexSquare).css(chosenSquare)
            dispatch({ type: 'CLICK-SQUARE', clickedSquare: indexSquare })

        }
    }

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
                    background={decimalToHexColour(props.squareColour)}
                    onClick={handleClick}
                />
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

export default HandleSquare
