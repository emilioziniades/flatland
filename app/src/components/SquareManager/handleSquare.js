import React, {useContext} from 'react'
import $ from 'jquery'

import ManageForm from '../forms/manageForm'
import { decimalToHexColour, coordToString, invertColour } from '../../utils/utilityFunctions'
import { SquareContext } from '../../context/SquareContext'
import { Square, Data, TableRow } from './tableComponents'

const HandleSquare = ({ squareId, squareColour }) => {

    const [selectedSquare, setSelectedSquare] = useContext(SquareContext)
    const invertedColour = invertColour(squareColour)

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }

    const handleClick = (e) => {
        $('#node-' + selectedSquare).css('border', 'none')
        $('#node-' + squareId).css(chosenSquare)
        setSelectedSquare(squareId)
    }

    return (    
        <TableRow>
            <Data>
                <h4 className='m-1'> {squareId ? squareId : '-'} </h4>
            </Data>

            <Data>
                <p> {coordToString(squareId) ? coordToString(squareId) : '-'} </p>
            </Data>

            <Data md='auto' >
                <Square
                    background={decimalToHexColour(squareColour)}
                    onClick={handleClick}
                />
            </Data>

            <Data>
                <p><i> {decimalToHexColour(squareColour) ? decimalToHexColour(squareColour) : '-'}</i></p>
            </Data>

            <Data>
                <ManageForm 
                    squareId= {squareId}
                />
            </Data>
        </TableRow>)
}

export default HandleSquare
