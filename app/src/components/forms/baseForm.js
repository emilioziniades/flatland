import React, { useState } from 'react'
import { Row, Col, Form, Button, Alert } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

import { ropstenLinkMaker } from '../../utils/blockchainUtils'
import EtherscanLink from './etherscanLink'


const BaseForm = ({ callback, message, givenId }) => {

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [ alert, setAlert ] = useState('')
    const [ show , setShow ] = useState(false)

    const handleClose = () => setShow(false)

    const onTogglePicker = () => setPickerVisible(!pickerVisible)

    const handleChange = (event) => setInput(event.hex)

    const handleSubmit = async (event) => {
        setLoading(true)
        if (event) {
          event.preventDefault()
          setInput('')
        }

        if (callback) {
            
            const txHash = await callback(input)
            const txAlert = <EtherscanLink 
                                type='tx' 
                                hash={txHash} 
                                message='Transaction changing square colour confirmed. View transaction details: '/>
            setAlert(txAlert)
        }
        setShow(true)
        setLoading(false) 
    }

    return(
        <Form onSubmit={handleSubmit}>
            <Row className='p-2 justify-content-center'>
                <Col>
                    <Form.Control 
                        readOnly
                        type='text'
                        name='colour'
                        placeholder= 'choose a colour'
                        value={input}
                    />
                    <Button
                        onClick={onTogglePicker}
                        variant='outline-primary'
                        className='m-2' >
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