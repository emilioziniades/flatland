import React, { useState } from 'react'
import { Form, Button, Modal, Spinner } from 'react-bootstrap'
import { ChromePicker } from 'react-color'
import { toast } from 'react-toastify'

import EtherscanLink from './etherscanLink'
import SquareHistoryButton from '../Canvas/squareHistoryButton'
import { coordToString } from '../../utils/utilityFunctions'


const BaseForm = ({ callback, message, currentColour, indexSquare }) => {
    
    const toastOptions = {
        position: "bottom-center",
        autoClose: 10000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: false,
        progress: undefined,
    }

    const squareCoords = coordToString(indexSquare)

    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)

    const [showForm, setShowForm] = useState(false)
    const handleFormOpen = () => {
        setShowForm(true)
        input === '' ? setInput(currentColour) : setInput(input)
    }
    const handleFormClose = () => setShowForm(false)

    const handleChange = (event) => setInput(event.hex)

    const handleSubmit = async (event) => {
        event.preventDefault()

        setLoading(true)
        setInput('')
        
        toast.info(
            'processing transaction... [To-Do: Add loading animation here]', {
                position: "bottom-center",
                autoClose: false,
                closeButton: false,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: false,
                progress: undefined,
                toastId: 'loading_toast',
            }
        )

        const txHash = await callback(input)

        if (txHash) {
            toast.success(<EtherscanLink 
                type='tx' 
                hash={txHash}
                abbreviate={true}
                message='🚀 Transaction confirmed! View details: '/> 
                , toastOptions)
        }
        else {
            toast.error('😢 Error processing transaction.', toastOptions)
        }
        setLoading(false)
        toast.dismiss('loading_toast')
        handleFormClose()
    }

    let modalHeaderText = ''
    
    if (message === 'change colour') {
        modalHeaderText = 'change colour of Square #' + indexSquare
    } else {
        modalHeaderText = 'claim Square #' + indexSquare
    }

    return(
        <div>
            <Button onClick={handleFormOpen}>{message}</Button>
        
            <Modal
                show={showForm}
                onHide={handleFormClose}
                //backdrop={loading ? 'static' : true}
            >
                <Modal.Header>
                    <Modal.Title> 
                        {modalHeaderText}
                    </Modal.Title>
                </Modal.Header>

                <Form onSubmit={handleSubmit}>
                <Modal.Body>   
                    {/* Proof of concept - adding info to modal body */}
                                        
                    <h6>Square #{indexSquare}</h6>    
                    <h6>Co-ordinates: {squareCoords}</h6>
                    <h6>Current colour: {currentColour}</h6>    
                    
                    <SquareHistoryButton indexSquare = {indexSquare} />
                    <p> </p>
                    
                    <Form.Control 
                        readOnly
                        type='text'
                        name='colour'
                        placeholder= 'choose colour'
                        value={input}
                    />
                    <ChromePicker 
                        color={input} 
                        disableAlpha={true}
                        onChange={handleChange}
                        onChangeChangeComplete={handleChange} 
                    />
                    
                    <p><i>*There is a small gas fee associated with changes to the flatland</i></p>
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="danger"
                        disabled= {loading}
                        onClick={handleFormClose}
                    >
                        cancel 
                    </Button>

                    <Button 
                        type='submit'
                        variant={ loading ? 'warning' : 'primary'}
                        disabled={ loading || !input }
                    > 
                        { loading ? 'awaiting confirmation...' : message }
                        {loading && <Spinner animation="border" as="span" variant="dark" size="sm" /> }
                    </Button>
                </Modal.Footer>
                </Form>
            </Modal>
        </div>
        )
}

export default BaseForm