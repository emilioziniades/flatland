import React, { useState, useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

import { useBlockchainForm } from '../customHooks/useBlockchainForm'
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'

const BaseForm = ({ callback, message }) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)

    const onTogglePicker = () => setPickerVisible(!pickerVisible)
    const { input, handleSubmit, handleChange } = useBlockchainForm(callback)

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
            { loading ? 'awaiting confirmation' : message }
            </Button>
            <HashLoader loading={loading} color='FFC145' className='m-4' /> 
            </Col>
            </Row>
        </Form>
        )
}

export default BaseForm