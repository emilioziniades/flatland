import React, { useState } from 'react'
import { Toast } from 'react-bootstrap'

const EventToast = ({data, toastKey}) => {
    const [date, id, colour] = data

    const [show, setShow] = useState(true)
    const toggleShow = () => setShow(!show)

    return(
        <Toast 
            key={toastKey} 
            className='m-1'
            show={show}
            onClose={toggleShow}>
        <Toast.Header>
            <b> Flatland Square Claim</b>
        </Toast.Header>
        <Toast.Body>
        Square  <b>#{id}</b> claimed on <b>{date}</b> with colour <b>{colour}</b>
        </Toast.Body>
    </Toast>
    )
}

export default EventToast