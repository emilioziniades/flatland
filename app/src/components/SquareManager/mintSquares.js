import React, { useContext } from 'react'
import { Row } from 'react-bootstrap'

import MintForm from '../forms/mintForm'
import { BlockchainContext } from '../BlockchainContext'

export const MintSquares = (props) => {

    const { state } = useContext(BlockchainContext)

    return(
        <Row>
         <main role='main' className='col-lg-12 d-flex text-center p-2'>
            <div className='content mr-auto ml-auto'>
                <h3 className='p5'> { Object.keys(state.ownedSquares).length > 0 ? 'or .. mint another square here' : 'You dont currently own squares. Claim one here...'} </h3>
                <p> Next square to claim: {state.squares.length + 1}</p>
                <p> Choose a <a href='https://en.wikipedia.org/wiki/Web_colors#Hex_triplet'>hexidecimal</a> colour for your square </p>       
                <MintForm />
            </div>  
        </main> 
        </Row>
    )}