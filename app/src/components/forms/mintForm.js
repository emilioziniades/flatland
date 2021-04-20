import React, { useState, useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

import { useBlockchainForm } from '../customHooks/useBlockchainForm'
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'

const MintForm = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)

    // Callback function, called by handleSubmit when form is submitted
    const mintSquare = async () => {

        try {

            setLoading(true)
            console.log(input)

            const squareDecimal = hexColourToDecimal(input)

            let tx = await state.contract.mint(squareDecimal)
            await tx.wait(1)
            const squareId = state.squares.length + 1
            
            console.log(tx)

            dispatch({
              type: 'MINT',
              colour: squareDecimal,
              id: squareId
            })
        }
        catch (e) {
            console.log(e)
        }

        setLoading(false)

    }

    const onTogglePicker = () => setPickerVisible(!pickerVisible)
    const { input, handleSubmit, handleChange } = useBlockchainForm(mintSquare)

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
            {loading ? 'awaiting confirmation' : 'claim square'}
            </Button>
            <HashLoader loading={loading} color='FFC145' className='m-4' /> 
            </Col>
            </Row>
        </Form>
        )
}

export default MintForm