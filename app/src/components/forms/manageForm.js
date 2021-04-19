import React, { useContext, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'

import {useBlockchainForm} from '../customHooks/useBlockchainForm'
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'


const ManageForm = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)

    const [loading, setLoading] = useState(false)

    // Callback function, called by handleSubmit when form is submitted
    const changeSquareColour = async () => {

        setLoading(true)

        console.log(inputs)

        const square = inputs.colour.trim()
        const squareDec = hexColourToDecimal(square)


        console.log(square)
        console.log(squareDec)

        const tx = await state.contract.changeColour(props.squareId, squareDec)
        const receipt = await tx.wait(1)

        console.log(tx)
        console.log(receipt)

        const newSquareArray = state.squares
        newSquareArray[props.squareId - 1] = squareDec

        const newOwnedSquares = state.ownedSquares
        newOwnedSquares[props.squareId] = squareDec

        dispatch({
            type: 'CHANGE',
            squares: newSquareArray,
            mySquares: newOwnedSquares,
        })

        setLoading(false)

    }

    const { inputs, handleSubmit, handleChange } = useBlockchainForm({colour: ''}, changeSquareColour);
    return(
        <Form onSubmit={handleSubmit}>
            <Row className='p-2 justify-content-center'>
            <Col>
            <Form.Control 
                type='text'
                name='colour'
                placeholder= 'e.g. #FFFFFF'
                value={inputs.colour}
                onChange={handleChange}
            />
            </Col>
            <Col>
            <Button 
                type='submit'
                variant={ loading ? 'warning' : 'primary'}
                className='ml-4 mr-4'
            >
            {loading ? 'awaiting confirmation' : 'change colour'}
            </Button>
            <HashLoader loading={loading} color='FFC145'className='p-4' /> 
            </Col>
            </Row>
        </Form>
        )
}

export default ManageForm