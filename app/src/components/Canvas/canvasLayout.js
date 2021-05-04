import React from 'react'
import { Container, Row, Col } from 'react-bootstrap'
import RecentActivity from './recentActivity'
import Canvas from './canvas'
import CanvasAlert from './canvasAlert' 

const CanvasLayout = () => {
    return(
        <>
        <Container>
            <Row className='justify-content-center p-3'>
                <Col md={{span:8}}>
                    <Canvas />
                </Col>
                <Col>
                    <RecentActivity />
                </Col>
            </Row>
        </Container>
        <Container >
            <Row className='justify-content-center p-3'>
                <CanvasAlert />
            </Row>
        </Container>
        </>

    )
}

export default CanvasLayout