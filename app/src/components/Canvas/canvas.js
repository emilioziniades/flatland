import React, { useState, useContext } from 'react'
import { useInterval } from 'ahooks'
import { Container, Row, Col } from 'react-bootstrap'
import $ from 'jquery'

import Square from './square'
import Grid from './grid'
import CanvasAlert from './canvasAlert'
import SidePanel from './sidePanel'
import CoordinateViewer from './coordinateViewer'
import ToggleOwnedSquares from './toggleOwnedSquares'
import { BlockchainContext } from '../BlockchainContext'
import { CoordinateContext } from '../CoordinateContext'
import EventToast from '../CanvasHistory/eventToast'

const gridLength = 256
let counter = 1

const Canvas = () => {

    const { state } = useContext(BlockchainContext)
    const { account, squares, totalSupply, maxSupply, history } = state || {}
    const [currentCoord, setCoord] = useState('.')

    const grid = [];
    for (let row = 0; row < gridLength; row++) {
        grid.push(counter)
        counter++;
    }

    //Effects hooks updated every second
    useInterval(() => {

        // Paint squares
        if (account) {

            //Clear squares first
            for (var i = 1; i <= maxSupply; i++ ) {
                const nodeId = '#node-'.concat(i)
                $(nodeId).css('background-color', '')
            } 

            //Load colours from blockchain
            for (var j = 1; j <= totalSupply; j++ ) {

                const square = squares[j-1]
                const hexColour = square.toString(16).padStart(6, '0')
                const nodeId = '#node-'.concat(j)

                // Jquery call that changes background colour
                $(nodeId).css('background-color', '#' + hexColour)
            }
        }
        else {

            // No squares found, colouring canvas randomly
            for (var k = 1; k <= 256; k++ ) { //DONT HARD-CODE MAX SUPPLY
                const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16);
                const nodeId = '#node-'.concat(k)
                $(nodeId).css('background-color', randomColor)
              }
        }

    }, 1000,
    //Only colours canvas if squares have changed
    [squares])

    let canvas = grid.map((node, nodeId) => {
        return (
                <Square key={nodeId} id={'node-'.concat(nodeId + 1)}> {node} </Square>
                )
            })
    

    let recentEvents = (history) ?
    history.slice(0,5).map((element, index) => {
            return(
                <EventToast data={element} key={element.txId} />
            )
        })
    : ''

  return (
    <CoordinateContext.Provider value={{ currentCoord, setCoord }}>
    <div>
        <Container >
            <Row className='justify-content-center p-3'>
                <Col md={{span:8}}>
                    <Row>
                        <Col>
                            {account ? <ToggleOwnedSquares /> : <div />}      
                        </Col>
                        <Col>
                            <CoordinateViewer />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Grid  className='mx-auto mr-auto ml-auto'> 
                                { canvas }
                            </Grid>
                        </Col>
                    </Row>
                    <Row>
                        <Col className='align-items-left'>
                            <SidePanel />
                        </Col>
                    </Row>
                </Col>
                <Col>
                    <h5> Recent Activity </h5>
                    {account ? recentEvents : <p> Not connected </p> }
                </Col>
            </Row> 
        </Container>

        <Container >
            <Row className='justify-content-center p-3'>
                <CanvasAlert />
            </Row>
        </Container>
      </div>
      </CoordinateContext.Provider>
    )}

  export default Canvas;