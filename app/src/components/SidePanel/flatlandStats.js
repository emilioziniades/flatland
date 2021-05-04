import React, { useContext } from 'react'
import { Alert } from 'react-bootstrap'

import EtherscanLink from '../forms/etherscanLink'
import { BlockchainContext } from '../stateProvider'


const FlatlandStats = () => {

    const { state } = useContext(BlockchainContext)
    const { connected, account, contract, maxSupply, totalSupply } = state || {}

    return(
        <Alert
            className = 'm-4'
            variant='secondary'>
            <h5>
                Flatland Smart Contract
            </h5>
            <h6>
                { account ? <EtherscanLink hash={contract.address} type='address' abbreviate={false} message='Source: '/> : 'Source: random colours' }
            </h6>
            { connected ?
            <p>
                # claimed squares : { totalSupply }
                <br/>
                # unclaimed squares : {maxSupply - totalSupply }
                <br/>
            </p>
            : <div/> }
        </Alert>
    )
}

export default FlatlandStats