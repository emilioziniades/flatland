import React, { useState, useContext } from 'react'
import {Form, Button, Modal } from 'react-bootstrap'
import HashLoader from 'react-spinners/HashLoader'
import $ from 'jquery'

import { BlockchainContext } from '../BlockchainContext'
import { SquareContext } from '../SquareContext'
import { loadBlockchain } from '../../utils/blockchainUtils'

const ConnectButton = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { account } = state
    const [loading, setLoading] = useState(false)
    const [loadingLogout, setLoadingLogout] = useState(false)
    const [showConfirm, setShowConfirm] = useState(false)
    const [selectedSquare, setSelectedSquare] = useContext(SquareContext)

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

        $('#node-' + selectedSquare).css('border', 'none')
        setSelectedSquare(null)
        setLoading(false)
    }

    const handleLogout = async () => {

        setLoadingLogout(true)

        handleCloseConfirm()
        dispatch({
            type: 'LOGOUT'
        })

        $('#node-' + selectedSquare).css('border', 'none')
        setSelectedSquare(null)
        setLoadingLogout(false)
    }

    const handleCloseConfirm = () => setShowConfirm(false);
    const handleShowConfirm = () => setShowConfirm(true);

    return(
            <Form inline>
                <Button
                className='m-1 mr-4'
                variant= { loading ? 'warning' : account ? 'success' : 'primary' }
                onClick={handleClick}
                disabled = {account ? true : false}>
                {loading ? 'connecting...' : account ? account : 'connect account'}
                </Button>
                <HashLoader loading={loading} color='FFC145' />

                {account ?
                <div>
                    <Button
                        variant='secondary'
                        onClick={handleShowConfirm}
                    >
                        Logout
                    </Button>

                    <Modal
                        show={showConfirm}
                        onHide={handleCloseConfirm}
                    >

                        <Modal.Header closeButton>
                            <Modal.Title>Confirm Logout</Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Are you sure you want to logout?
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleCloseConfirm}>
                                Cancel
                            </Button>
                            <Button variant="primary" onClick={handleLogout}>
                                Logout
                            </Button>
                        </Modal.Footer>

                    </Modal>

                    <HashLoader loading={loadingLogout} color='FFC145' />
                </div>
                :
                <div />
                }
                
            </Form>
    )
}

export default ConnectButton