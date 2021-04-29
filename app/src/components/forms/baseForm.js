import React, { useState } from 'react'
import { Col, Form, Button, Alert, InputGroup } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

import EtherscanLink from './etherscanLink'


const BaseForm = ({ callback, message, givenId }) => {

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [ alert, setAlert ] = useState('')
    const [ show , setShow ] = useState(true)

    const handleClose = () => setShow(false)

    const onTogglePicker = () => {
        setPickerVisible(!pickerVisible)
        setInput('#000000')
    }

    const handleChange = (event) => setInput(event.hex)

    const handleSubmit = async (event) => {
        event.preventDefault()
        setLoading(true)
        setPickerVisible(false) 
        setInput('')
    

        const txHash = await callback(input)

        const txAlert = ( txHash ? 
            <EtherscanLink 
                type='tx' 
                hash={txHash} 
                message='Transaction changing square colour confirmed. View transaction details: '/> :
            <EtherscanLink message='Error processing transaction.' /> )
        
        setLoading(false) 
        setShow(true)
        setAlert(txAlert) 
        

        
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Form.Row className='p-2 justify-content-center'>
                <Form.Group as={Col}>
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
                </Form.Group>
                <Form.Group as={Col}>
                    <Button 
                        type='submit'
                        variant={ loading ? 'warning' : 'primary'}
                        className='mr-5'
                        disabled={ loading || !input }
                    > 
                        { loading ? 'awaiting confirmation' : message }
                    </Button>
                    <HashLoader loading={loading} color='FFC145' /> 
                </Form.Group>
            </Form.Row>
            <Form.Row className='justify-content-center'>
            <Alert
                dismissible
                show={show}
                onClose={handleClose}
                variant='light' 
                className='ml-5 mr-5'
                    >
                {alert}
            </Alert>
            </Form.Row>
        </Form>
        )
}

export default BaseForm