import React, { useState, useContext } from 'react'
import {Form, Button, Modal, Spinner } from 'react-bootstrap'
import $ from 'jquery'

import { BlockchainContext, SquareContext } from '../stateProvider'
import { loadBlockchain } from '../../utils/blockchainUtils'

const ConnectButton = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { account } = state || {}
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
                        {loading && <Spinner animation="border" as="span" variant="dark" size="sm" /> }
                </Button>

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

                    {loadingLogout && <Spinner animation="border" as="span" variant="dark" size="sm" /> }

                </div>
                :
                <div />
                }
                
            </Form>
    )
}

export default ConnectButton