import React, { useState } from 'react'
import { Col, Form, Button, InputGroup, Spinner } from 'react-bootstrap'
import { ChromePicker } from 'react-color'
import { toast } from 'react-toastify'

import EtherscanLink from './etherscanLink'


const BaseForm = ({ callback, message, givenId }) => {
    
    const toastOptions = {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    }
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)

    const handlePickerOpen = () => {
        setPickerVisible(true)
        input === '' ? setInput('#000000') : setInput(input)
    }

    const handlePickerClose = () => {
        setPickerVisible(false)
    }

    const handleChange = (event) => setInput(event.hex)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
        setPickerVisible(false) 
        setInput('')

        const txHash = await callback(input)

        if (txHash) {
            toast.success(<EtherscanLink 
                type='tx' 
                hash={txHash}
                abbreviate={true}
                message='🚀 Transaction confirmed! View details: '/> 
                , toastOptions)
        }
        else {
            toast.error('😢 Error processing transaction.', toastOptions)
        }
        setLoading(false)
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
                        onClick={ pickerVisible ? handlePickerClose : handlePickerOpen}
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
                        { loading ? 'awaiting confirmation...' : message }
                    {loading && <Spinner animation="border" as="span" variant="dark" size="sm" /> }
                    </Button>
                </Form.Group>
            </Form.Row>
        </Form>
        )
}

export default BaseForm