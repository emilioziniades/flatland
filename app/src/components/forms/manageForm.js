import React, { useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import {useBlockchainForm} from '../customHooks/useBlockchainForm';
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'


export default function ManageForm(props) {

    const { state, dispatch } = useContext(BlockchainContext)

    // Callback function, called by handleSubmit when form is submitted
    const changeSquareColour = async () => {

        console.log(inputs)

        // this code assumes that input is "#XXXXXX" , where X is a hexadecimal digit
        const square = inputs.colour.trim()
        const squareDec = hexColourToDecimal(square)

        // TODO check user inputs, ensuring it is six hex digits 
        // (otherwise, hash that input and just take first six digits)

        console.log(square)
        console.log(squareDec)

        const tx = await state.contract.changeColour(props.squareId, squareDec)
        const receipt = await tx.wait(1)

        console.log(tx)

        const newSquareArray = state.squares
        newSquareArray[props.squareId - 1] = squareDec 

        dispatch({
            type: 'CHANGE',
            payload: newSquareArray
        })

    }

    const { inputs, handleSubmit, handleChange } = useBlockchainForm({colour: ''}, changeSquareColour);
    return(
        <Form onSubmit={handleSubmit}>
            <Row className="m-3">
            <Col>
            <Form.Control 
                type="text"
                name="colour"
                placeholder= "e.g. #FFFFFF"
                className="m-1"
                value={inputs.colour}
                onChange={handleChange}
            />
            </Col>
            <Col>
            <Button 
                type="submit"
                variant="primary"
                className = "m-1"
            > 
            Change Colour
            </Button>
            </Col>
            </Row>
        </Form>
        )
}