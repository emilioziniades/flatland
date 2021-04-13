import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import ManageForm from '../forms/manageForm'
import { decimalToHexColour } from '../../utils/utilityFunctions'

const Square = styled.div`
    border: 0.1px solid #000000;
    text-align: center;
    height: 16px;
    width: 16px;
    ${props => `background: ${props.background};`}
    `

export const HandleSquare = (props) => {

    return (    
            <div>
            <Row className='d-flex ml-auto mr-auto'>
                <Col md='auto' className='justify-content-center'>
                    <h4 className='m-1'> Square {props.squareId ? props.squareId : '-'} </h4>
                </Col>
                <Col md='auto' className='align-self-center justify-content-center'>
                    <Square
                        background={decimalToHexColour(props.squareColour)} />
                </Col>
                <Col md='auto' className='justify-content-center m-1'>
                    <p><i> current colour : {decimalToHexColour(props.squareColour) ? decimalToHexColour(props.squareColour) : '-'}</i></p>

                </Col>
                <Col className='justify-content-center ml-1 mr-1'>
                <ManageForm 
                    squareId= {props.squareId}
                />
                </Col>
            </Row>
            <hr/>
            </div>)
}