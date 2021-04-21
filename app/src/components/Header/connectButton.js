import React, { useState, useContext } from 'react'
import {Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'

import { BlockchainContext } from '../BlockchainContext'
import { loadBlockchain } from '../../utils/blockchainUtils'

const ConnectButton = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { account } = state
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {

        setLoading(true)

        if (window.ethereum) {
            const blockchainState = await loadBlockchain()
            dispatch({
                type: 'LOAD',
                payload: blockchainState
            })
        }
        else {
            window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!')
        }
        setLoading(false)
    }

    return(
            <Form inline>
                <Button
                className='m-1 mr-4'
                variant= { loading ? 'warning' : account ? 'success' : 'primary' }
                onClick={handleClick}>
                { loading ? 'connecting...' : account ? account : 'connect account' }
                </Button>
                <HashLoader loading={loading} color='FFC145' />
            </Form>
    )
}

export default ConnectButton