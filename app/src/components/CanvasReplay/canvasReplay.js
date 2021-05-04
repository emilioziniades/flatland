import React, { useState, useContext } from 'react'
import { Container, Row, Form } from 'react-bootstrap'

import { BlockchainContext } from '../stateProvider'
import Grid from '../Canvas/grid'
import GridItem from '../Canvas/gridItem'

const CanvasReplay = () => {

    const { state } = useContext(BlockchainContext)
    const { history } = state

    const max = history[0].blockHeight
    const min = history[history.length - 1].blockHeight

    const [ range, setRange ] = useState(min + 1000)
    const handleChange = event => setRange(event.target.value)

    const [snapshot, setSnapshot ] = useState()

    const gridLength = 256
    let counter = 1

    const grid = []
    for (let row = 0; row < gridLength; row++) {
        grid.push(counter)
        counter++
    }

    let squaresSnapshot = {}
    let historyCopy = history
    // historyCopy = historyCopy.reverse()

    for (let event of historyCopy) {
        if (event.blockHeight < range) {
            squaresSnapshot[event.id] = event.colour
        }
    }
    // console.log(squaresSnapshot)

    let canvas = grid.map((element, index) => {
        return (
                <GridItem as='div' key={element} colour={squaresSnapshot[index + 1]} ></GridItem>
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
                    <Form.Label>Range</Form.Label>
                    <Form.Control 
                        type="range"
                        value={range}
                        min={min}
                        max={max}
                        onChange={handleChange} />
                </Form.Group>
                </Form>
            <hr />
            <Row className='justify-content-center'>
                <h1>{range}</h1>
            </Row>
            </Container>
            

    )
}
export default CanvasReplay