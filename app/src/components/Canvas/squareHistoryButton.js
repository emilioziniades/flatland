import React, { useState } from 'react'
import { Button, Modal } from 'react-bootstrap'

import SquareHistoryTable from './squareHistoryTable'

const SquareHistoryButton = ({indexSquare}) => {
    
    const [showForm, setShowForm] = useState(false)
    
    const handleFormOpen = () => setShowForm(true)
    const handleFormClose = () => setShowForm(false)

    return(
        <div>
            <Button onClick={handleFormOpen}>show square history</Button>
        
            <Modal
                size="lg"
                show={showForm}
                onHide={handleFormClose}
            >
                <Modal.Header closeButton>
                    <Modal.Title> 
                        History of Square #{indexSquare}
                    </Modal.Title>
                </Modal.Header>

                
                <Modal.Body>   
                    <SquareHistoryTable />
                </Modal.Body>

                <Modal.Footer>
                    <Button 
                        variant="primary"
                        onClick={handleFormClose}
                    >
                        close 
                    </Button>
                </Modal.Footer>
                
            </Modal>
        </div>
        )
}

export default SquareHistoryButton