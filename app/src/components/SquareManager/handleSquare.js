import React from 'react'
import { Row, Col } from 'react-bootstrap'
import styled from 'styled-components'

import ManageForm from '../forms/manageForm'
import { decimalToHexColour } from '../../utils/utilityFunctions'

const Square = styled.div`
    padding: 0em;
    border: 0.1px solid #000000;
    text-align: center;
    height: 16px;
    width: 16px;
    ${props => `background: ${props.background};`}
    `

export const HandleSquare = (props) => {

    return (<main role='main' className='col-lg-12 d-flex text-center'>
            <Row className='content mr-auto ml-auto'>

                <Row className='justify-content-center align-items-center'> 
                <Col className='d-flex justify-content-center'>
                    <h4 className='m-1'> Square {props.squareId ? props.squareId : '-'} </h4>
                </Col>
                <Col className='d-flex justify-content-center'>
                    <Square
                        background={decimalToHexColour(props.squareColour)} />
                </Col>
                <Col className='d-flex justify-content-center'>
                    <p><i> current colour : {decimalToHexColour(props.squareColour) ? decimalToHexColour(props.squareColour) : '-'}</i></p>

                </Col>
                </Row>
                <ManageForm 
                    squareId= {props.squareId}
                />
            </Row>  
        </main>)
}