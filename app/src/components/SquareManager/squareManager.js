import React, { useContext } from 'react'
import { Container } from 'react-bootstrap'

import { BlockchainContext } from '../BlockchainContext'
import { HandleSquares } from './handleSquares'
import { MintSquares } from './mintSquares'
import { MissingData } from './missingData'

export const SquareManager = (props) => {

    const { state } = useContext(BlockchainContext)

    return(
        <Container> 
        {state.account ?
        //Account is connected 
            state.contract ?
                //Contract is deployed on current blockchain
                Object.keys(state.ownedSquares).length > 0 ?
                    //Account owns squares, let them manage
                             <div>
                             <HandleSquares/>
                             <MintSquares/>
                             </div>
                    // Account owns no squares, let them mint
                    : <MintSquares/>
                // Smart contract is NOT deployed to this network
                : <MissingData 
                    message='Oh no ... it looks like the Flatland smart contract is not deployed to this network. Try connecting to localhost:8545' />
            // Account isn't connected
            : <MissingData
                message='Get started by connecting your account!' /> }
            </Container> 
    )}

export default SquareManager