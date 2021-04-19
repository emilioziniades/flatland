import React from 'react'
import {Row, Alert} from 'react-bootstrap'

const CanvasAlert = () => {
    return(
        <Row className='d-flex justify-content-center'>
        <Alert variant='warning' className='pr-5 pl-5'>
            Note: transactions claiming a square or changing colour must be confirmed on the Ethereum Ropsten Testnet blockchain before it will reflect on Flatland. Blocks are mined every 15 seconds on average.
        </Alert>
    </Row>
    )
}

export default CanvasAlert