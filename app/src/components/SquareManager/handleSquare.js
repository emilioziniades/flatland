import React, {useContext} from 'react'

import ManageForm from '../forms/manageForm'
import { decimalToHexColour, coordToString } from '../../utils/utilityFunctions'
import { SquareContext } from '../../components/stateProvider'
import { Square, Data, TableRow } from './tableComponents'

const HandleSquare = ({ squareId, squareColour }) => {

    const [ selectedSquare, setSelectedSquare ] = useContext(SquareContext)

    const handleClick = (e) => {
        setSelectedSquare(parseInt(squareId))
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
                    id={'node-' + squareId}
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
