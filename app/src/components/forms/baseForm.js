import React, { useState } from 'react'
import { Row, Col, Form, Button, Alert, InputGroup } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

import EtherscanLink from './etherscanLink'


const BaseForm = ({ callback, message, givenId }) => {

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [ alert, setAlert ] = useState('')
    const [ show , setShow ] = useState(false)

    const handleClose = () => setShow(false)

    const onTogglePicker = () => {
        setPickerVisible(!pickerVisible)
        setInput('#000000')
    }

    const handleChange = (event) => setInput(event.hex)

    const handleSubmit = async (event) => {
        setLoading(true)
        setPickerVisible(false)
        if (event) {
          event.preventDefault()
          setInput('')
        }

        if (callback) {
            
            const txHash = await callback(input)

            const txAlert = ( txHash ? 
                <EtherscanLink 
                    type='tx' 
                    hash={txHash} 
                    message='Transaction changing square colour confirmed. View transaction details: '/> :
                <EtherscanLink message='Error processing transaction.' /> )
            setShow(true)
            setAlert(txAlert) 
            

            
        }
        setLoading(false) 
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row className='p-2 justify-content-center'>
                <Col>
                <InputGroup>
                    <Form.Control 
                        readOnly
                        type='text'
                        name='colour'
                        placeholder= 'choose colour'
                        value={input}
                    />
                    <InputGroup.Append>
                    <Button
                        onClick={onTogglePicker}
                        variant='outline-primary'
                        >
                    { pickerVisible ? 'hide picker' : 'show picker' }
                    </Button>
                    </InputGroup.Append>
                </InputGroup>
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
                        className='mr-5'
                    > 
                        { loading ? 'awaiting confirmation' : message }
                    </Button>
                    <HashLoader loading={loading} color='FFC145' /> 
                </Col>
            </Row>
            <Row className='justify-content-center'>
            <Alert
                dismissible
                show={show}
                onClose={handleClose}
                variant='light' 
                className='ml-5 mr-5'
                    >
                {alert}
            </Alert>
            </Row>
        </Form>
        )
}

export default BaseForm