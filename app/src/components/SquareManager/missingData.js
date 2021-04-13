import React from 'react'
import { Row } from 'react-bootstrap'

export const MissingData = (props) => {
    return(
        <Row>
        <main role='main' className='col-lg-12 d-flex text-center'>
            <div className='content mr-auto ml-auto'>
                <h2 className='p5'> {props.message} </h2>
            </div>  
        </main>
        </Row>
    )}