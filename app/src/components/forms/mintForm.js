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
    const [colour, setColour] = useState('#FFF111')

    // Callback function, called by handleSubmit when form is submitted
    const mintSquare = async () => {

        try {

            setLoading(true)
            
            console.log(inputs)

            const square = inputs.colour.trim()
            const squareDec = hexColourToDecimal(square)

            let tx = await state.contract.mint(squareDec)
            await tx.wait(1)
            const squareId = state.squares.length + 1
            
            console.log(tx)

            dispatch({
              type: 'MINT',
              colour: squareDec,
              id: squareId
            })
        }
        catch (e) {
            console.log(e)
        }

        setLoading(false)

    }

    const onTogglePicker = () => setPickerVisible(!pickerVisible)
    const handlePickerChange = (colour) => setColour(colour)
    const handlePickerChangeComplete = (colour) => setColour(colour)

    const { inputs, handleSubmit, handleChange } = useBlockchainForm({colour: ''}, mintSquare)

    return(
        <Form onSubmit={handleSubmit}>
            <Row className='m-5'>
            <Col>
            <Form.Control 
                readOnly
                type='text'
                name='colour'
                placeholder= 'e.g. #FFFFFF'
                value={inputs.colour}
            />
            <Button
                onClick={onTogglePicker}
                variant='light' >
                    { pickerVisible ? 'hide colour picker' : 'show colour picker' }
            </Button>
            { pickerVisible && (
            <ChromePicker 
                color={inputs.colour} 
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

export default MintForm