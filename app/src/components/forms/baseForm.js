import React, { useState } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

const BaseForm = ({ callback, message }) => {

    const [input, setInput] = useState('')
    const [loading, changeLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)

    const onTogglePicker = () => setPickerVisible(!pickerVisible)

    const handleChange = (event) => setInput(event.hex)

    const handleSubmit = async (event) => {
        changeLoading(!loading)
        if (event) {
          event.preventDefault()
          setInput('')
        }
        if (callback) {
            await callback(input)
        }
        changeLoading(!loading)
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
        </Form>
        )
}

export default BaseForm