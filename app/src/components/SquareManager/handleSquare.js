import React, {useContext} from 'react'
import $ from 'jquery'

import ManageForm from '../forms/manageForm'
import { decimalToHexColour, coordToString, invertColour } from '../../utils/utilityFunctions'
import { BlockchainContext } from '../BlockchainContext'
import { Square, Data, TableRow } from './tableComponents'

const HandleSquare = ({ squareId, squareColour }) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { isSquareClicked, clickedSquare } = state
    const invertedColour = invertColour(squareColour)

    const chosenSquare = {
        'border': '2px solid ' + invertedColour,
    }

    const handleClick = (e) => {
        
        const indexSquare = 'node-'.concat(squareId)
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
