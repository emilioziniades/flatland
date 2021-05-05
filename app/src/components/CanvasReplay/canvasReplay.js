import React, { useState, useContext } from 'react'
import { Container, Row, Form, Button  } from 'react-bootstrap'

import { BlockchainContext } from '../stateProvider'
import Grid from '../Canvas/grid'
import GridItem from '../Canvas/gridItem'

const CanvasReplay = () => {

    const { state } = useContext(BlockchainContext)
    const { history } = state

    const max = history[0].blockHeight
    const min = history[history.length - 1].blockHeight

    const [ range, setRange ] = useState(min)

    const [snapshot, setSnapshot] = useState({})


    const handleChange = event => {

        setRange(event.target.value)
        let squaresSnapshot = {}

        for (var i = history.length - 1; i >= 0; i--) {
            let currentEvent = history[i]
            if (currentEvent.blockHeight > range) { break }
            squaresSnapshot[currentEvent.id] = currentEvent.colour
        }

        setSnapshot(squaresSnapshot)

    }

    const handleClick = event => {
        setRange((max + min) / 2 )
    }


    const gridLength = 256
    let counter = 1

    const grid = []
    for (let row = 0; row < gridLength; row++) {
        grid.push(counter)
        counter++
    }


    let canvas = grid.map((element, index) => {
        return (
                <GridItem as='div' key={element} colour={snapshot[index + 1]} ></GridItem>
                )
            })

    return(
            <Container>
                <Row className='m-5'>
                        <Grid  className='mx-auto mr-auto ml-auto'> 
                            { canvas }
                        </Grid>
                </Row>
                <Form className='m-5'>
                <Form.Group controlId="formBasicRange">
                    <Form.Label>Blockheight: {range}</Form.Label>
                    <Form.Control 
                        type="range"
                        value={range}
                        min={min}
                        max={max}
                        onChange={handleChange} />
                </Form.Group>
                </Form>
            <Row className='justify-content-center m-5'>
                <Button variant='success' onClick={handleClick}> Replay! </Button>
            </Row>
            </Container>
            

    )
}
export default CanvasReplay