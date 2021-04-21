import React from 'react'
import { Row } from 'react-bootstrap'

const MissingData = ({ message }) => {
    return(
        <Row>
        <main role='main' className='col-lg-12 d-flex text-center'>
            <div className='content mr-auto ml-auto'>
                <h2 className='p5'> {message} </h2>
            </div>  
        </main>
        </Row>
    )}

export default MissingData