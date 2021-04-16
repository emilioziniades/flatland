import React, { useState, useContext } from 'react'
import { useInterval } from 'ahooks'
import styled from 'styled-components'
import { Row } from 'react-bootstrap'
import $ from 'jquery'

import { BlockchainContext } from '../BlockchainContext'
import EtherscanLink from '../etherscanLink'
import Square from './square'
import Grid from './grid'

const gridLength = 256
let counter = 1

const Canvas = (props) => {

    const { state } = useContext(BlockchainContext)

    const grid = [];
    for (let row = 0; row < gridLength; row++) {
        grid.push(counter)
        counter++;
    }

    //Hook to colour canvas
    useInterval(() => {
        if (state.contract) {

            //Clear squares first
            for (var i = 1; i <= state.maxSupply; i++ ) {
                const nodeId = '#node-'.concat(i)
                $(nodeId).css('background-color', '')
            } 

            //Load colours from blockchain
            for (var j = 1; j <= state.totalSupply; j++ ) {

                const square = state.squares[j-1]
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
    [state.squares])

  return (
    <div>
        <Row className='d-flex justify-content-center p-3'>
            <Grid className='mx-auto'> 
            {grid.map((node, nodeId) => {
              return (
                      <Square key={nodeId} id={'node-'.concat(nodeId + 1)}> {node} </Square>
                    )
                  })}
            </Grid>
        </Row>
        <Row className='d-flex justify-content-center p-3'>
            <h6>
                Source: { state.contract ? <EtherscanLink address={state.contract.address} type='address' /> : 'random colours' }
            </h6>
        </Row>
    </div>
    )}

  export default Canvas;