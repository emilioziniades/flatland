import React, { useContext } from 'react';
import { Row, Col, Form, Button } from 'react-bootstrap';

import {useBlockchainForm} from "../customHooks/useBlockchainForm";
import { BlockchainContext } from '../BlockchainContext'

export default function MintForm() {

    const { state, dispatch } = useContext(BlockchainContext)

    // Callback function, called by handleSubmit when form is submitted
    const mintSquare = async () => {

        // this code assumes that input is "#XXXXXX" , where X is a hexadecimal digit
        const square = inputs.colour.trim()
        const squareHex = '0x' + square.slice(1,)
        const squareDec = parseInt(squareHex, 16)

        // TODO check user inputs, ensuring it is six hex digits 
        // (otherwise, hash that input and just take first six digits)
        console.log("minting " + squareDec)


        let tx = await state.contract.mint(squareDec)
        let receipt = await tx.wait(1)
        const squareId = await state.contract.getSquares().length

        console.log(tx)
        dispatch({
          type: 'MINT',
          colour: squareDec,
          id: squareId
        })

    }

    const { inputs, handleSubmit, handleChange } = useBlockchainForm({colour: ''}, mintSquare);
    return(
        <Form onSubmit={handleSubmit}>
            <Row>
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
            MINT
            </Button>
            </Col>
            </Row>
        </Form>
        )
}