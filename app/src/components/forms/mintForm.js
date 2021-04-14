import React, { useState, useContext } from 'react'
import { Row, Col, Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import $ from 'jquery'

import { useBlockchainForm } from '../customHooks/useBlockchainForm'
import { BlockchainContext } from '../BlockchainContext'
import EtherscanLink from '../etherscanLink'
import { window } from '@ungap/global-this'

export default function MintForm() {

    const { state, dispatch } = useContext(BlockchainContext)
    const [loading, setLoading] = useState(false)

    // Callback function, called by handleSubmit when form is submitted
    const mintSquare = async () => {

        try {

            setLoading(true)

            // this code assumes that input is "#XXXXXX" , where X is a hexadecimal digit
            const square = inputs.colour.trim()
            const squareHex = '0x' + square.slice(1,)
            const squareDec = parseInt(squareHex, 16)

            // TODO check user inputs, ensuring it is six hex digits 
            // (otherwise, hash that input and just take first six digits)

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

    const { inputs, handleSubmit, handleChange } = useBlockchainForm({colour: ''}, mintSquare);
    return(
        <Form onSubmit={handleSubmit}>
            <Row className='m-5'>
            <Col>
            <Form.Control 
                type='text'
                name='colour'
                placeholder= 'e.g. #FFFFFF'
                value={inputs.colour}
                onChange={handleChange}
            />
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