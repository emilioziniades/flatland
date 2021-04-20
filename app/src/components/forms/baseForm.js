import React, { useState, useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import { ChromePicker } from 'react-color'

import { useBlockchainForm } from '../customHooks/useBlockchainForm'
import { BlockchainContext } from '../BlockchainContext'
import { hexColourToDecimal } from '../../utils/utilityFunctions'

const BaseForm = ({ callback }) => {

    const [loading, setLoading] = useState(false)
    const [pickerVisible, setPickerVisible] = useState(false)
    const [colour, setColour] = useState('#FFF111')

    const onTogglePicker = () => setPickerVisible(!pickerVisible)
    const handlePickerChange = (colour) => setColour(colour)
    const handlePickerChangeComplete = (colour) => setColour(colour)

    const { inputs, handleSubmit, handleChange } = useBlockchainForm({colour: ''}, callback)

    return(
        <Form onSubmit={handleSubmit}>
            <Row className='m-5'>
            <Col>
            <Form.Control 
                readOnly
                type='text'
                name='colour'
                placeholder= 'e.g. #FFFFFF'
                value={colour.hex}
            />
            <Button
                onClick={onTogglePicker}
                variant='light' >
                    { pickerVisible ? 'hide colour picker' : 'show colour picker' }
            </Button>
            { pickerVisible && (
            <ChromePicker 
                color={colour} 
                disableAlpha={true}
                onChange={handlePickerChange}
                onChangeChangeComplete={handlePickerChangeComplete} 
            />
            )}
            </Col>
            <Col>
            <Button 
                type='submit'
                variant={ loading ? 'warning' : 'primary'}
                className = 'ml-2 mr-5 pl-2 pr-2 mint-button'
            > 
            {loading ? 'awaiting confirmation' : 'claim square'}
            </Button>
            <HashLoader loading={loading} color='FFC145' /> 
            </Col>
            </Row>
            <Row className='mint-notif-row'>
                {/* { tx ? <EtherscanLink address={tx.hash} type='tx' /> : <div /> } */}
            </Row>
        </Form>
        )
}

export default BaseForm