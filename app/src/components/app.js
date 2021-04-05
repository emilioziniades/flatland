import React, { useState, useEffect, useReducer, createContext } from "react"
import { Container } from "react-bootstrap"
import { ethers } from "ethers"

import Flatland from "../../../build/contracts/Flatland.json"
import Header from './header'
import Hero from './hero'
import Canvas from './canvas'
import SquareManager from './squareManager'
import { BlockchainContext } from './BlockchainContext'

import { blockchainReducer } from '../utils/blockchainUtils'
import { bigNumberToHexColour, bigNumberToNumber } from '../utils/utilityFunctions'

/*

MNEMONIC USED FOR TESTING PURPOSES: 
roof gasp satisfy cause gather frequent forget swim swarm real unaware video

 */

const App = () => {

    const initialState = {
        connected: false,
        contract: null,
        provider: null,
        squares: [],
        totalSupply: 0,
        maxSupply: 0,
        account: '',
        ownedSquares: []

    }
    let [state, dispatch] = useReducer(blockchainReducer, initialState)

    const {connected, contract, provider, squares, totalSupply, maxSupply, account, ownedSquares} = state

   //Hook to listen for new squares
    useEffect(() => {
        const interval = setInterval(() => {
            //Updates squares every second
            // listenForSquares()
            // updateSquares()
        }, 1000);
            return () => clearInterval(interval)
    })

    const listenForSquares = async () => {
        if (state.contract) {
            const filter = {
                address: state.contract.address,
                topics: [
                ethers.utils.id("NewSquare(uint256,uint256)")
                ]
            }
            state.provider.once(filter, (event) => {
                // updateSquares()
            })

        }
    }

    const changeColour = async (squareId, squareColour) => {

            if (state.contract) {

                console.log(squareId)
                console.log(squareColour)

                await state.contract.changeColour(squareId, squareColour)

                const newSquareArray = state.squares
                newSquareArray[squareId - 1] = squareColour

                // setFlatlandState(prevState => {
                //     return {
                //         ...flatlandState,
                //         squares: newSquareArray

                //     }
                // })

              }
            else {console.log("Contract not found!")}
    }

        return(
        <BlockchainContext.Provider value={{state, dispatch}}>
        <Header/>                    
        <Container>
            <Hero />
            <Canvas/>                    
            <hr/>
            <SquareManager />
            
        </Container>
        </BlockchainContext.Provider>)
    }

export default App