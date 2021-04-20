import React, { useContext, useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

import {useBlockchainForm} from '../customHooks/useBlockchainForm'
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'

const ManageForm = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)

    // Callback function, called by handleSubmit when form is submitted
    const changeSquareColour = async () => {

        setLoading(true)
        console.log(input)

        const squareDecimal = hexColourToDecimal(input)

        console.log(squareDecimal)

        const tx = await state.contract.changeColour(props.squareId, squareDecimal)
        const receipt = await tx.wait(1)

        console.log(tx)
        console.log(receipt)

        const newSquareArray = state.squares
        newSquareArray[props.squareId - 1] = squareDecimal

        const newOwnedSquares = state.ownedSquares
        newOwnedSquares[props.squareId] = squareDecimal

        dispatch({
            type: 'CHANGE',
            squares: newSquareArray,
            mySquares: newOwnedSquares,
        })

        setLoading(false)

    }

    const onTogglePicker = () => setPickerVisible(!pickerVisible)
    const { input, handleSubmit, handleChange } = useBlockchainForm(changeSquareColour);

    return(
        <Form onSubmit={handleSubmit}>
            <Row className='p-2 justify-content-center'>
            <Col>
            <Form.Control
                readOnly
                type='text'
                name='colour'
                placeholder= '↓'
                value={input}
            />
            <Button
                onClick={onTogglePicker}
                variant='light' >
                    { pickerVisible ? 'hide colour picker' : 'show colour picker' }
            </Button>
            { pickerVisible && (
            <ChromePicker 
                color={input} 
                disableAlpha={true}
                onChange={handleChange}
                onChangeChangeComplete={handleChange} 
            />
            )}
            </Col>
            <Col>
            <Button 
                type='submit'
                variant={ loading ? 'warning' : 'primary'}
            >
            {loading ? 'awaiting confirmation' : 'change colour'}
            </Button>
            <HashLoader loading={loading} color='FFC145' className='m-4' /> 
            </Col>
            </Row>
        </Form>
        )
}

export default ManageForm