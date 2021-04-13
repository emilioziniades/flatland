import React, { useState, useContext } from 'react'
import {Form, Button } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'

import { BlockchainContext } from '../BlockchainContext'
import { loadBlockchain } from '../../utils/blockchainUtils'

export const ConnectButton = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {

        setLoading(true)
        const blockchainState = await loadBlockchain()
        dispatch({
            type: 'LOAD',
            payload: blockchainState
        })
        setLoading(false)
    }

    return(
            <Form inline>
                <Button
                className='m-1'
                variant= { loading ? 'warning' : state.account ? 'success' : 'primary' }
                onClick={handleClick}>
                { loading ? 'connecting...' : state.account ? state.account : 'connect account' }
                </Button>
                <HashLoader loading={loading} color='FFC145' />
            </Form>
    )
}