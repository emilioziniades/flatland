import React, { useState, useContext } from 'react'
import { Container, Row, Form, Button  } from 'react-bootstrap'
import { useInterval } from 'ahooks'

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
    const [ isReplay, setIsReplay ] = useState(false)


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

    const handleClick = () => {
        
        const replayInterval = 50
        const replayIncrement = 1000

        setIsReplay(true)
        
        var input = document.querySelector(".flatland-replay-input")
        var nativeInputValueSetter = Object.getOwnPropertyDescriptor(
            window.HTMLInputElement.prototype,
            "value"
          ).set
        
        var x = min

        var myInterval = setInterval(() => {
            nativeInputValueSetter.call(input, x)
            var inputEvent = new Event("input", { bubbles: true })
            input.dispatchEvent(inputEvent)
            x += replayIncrement

            if (x > max) {
                setIsReplay(false)
                clearInterval(myInterval)
            }

        }, replayInterval)

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
                <GridItem as='div' key={element} colour={snapshot[index + 1]} />
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
                <Form.Group controlId='formBasicRange'>
                    <Form.Label>Blockheight: {range}</Form.Label>
                    <Form.Control 
                        type='range'
                        value={range}
                        min={min}
                        max={max}
                        onChange={handleChange}
                        className='flatland-replay-input'
                        disabled={ isReplay ? true : false } />
                </Form.Group>
                </Form>
            <Row className='justify-content-center m-5'>
                <Button 
                    variant={ isReplay ? 'danger' : 'success' } 
                    onClick={handleClick}
                    disabled={ isReplay ? true : false }> 
                    { isReplay ? 'replaying...' : 'Replay!' }
                </Button>
            </Row>
            </Container>
            

    )
}
export default CanvasReplay