import React, { useState, useContext } from 'react'
import { Button, Toast } from 'react-bootstrap'
import styled from 'styled-components'

import { SquareContext } from '../stateProvider'

const SquareIcon = styled.div`
    border: 1px solid #E2E2E2;
    height: 16px;
    width: 16px;
    display: inline-block;
    vertical-align: middle;
    ${props => `background: ${props.background};`}
    `

const EventToast = ({ data }) => {
    const { date, id, colour, topic } = data

    const [show, setShow] = useState(true)
    const toggleShow = () => setShow(!show)

    const [ setSelectedSquare ] = useContext(SquareContext)

    const handleClick = (e) => {
        setSelectedSquare(id)
    }

    let today = new Date().toLocaleDateString('en-GB')

    return(
        <Toast 
            className='m-1'
            show={show}
            onClose={toggleShow}>
            <Toast.Header>
            <SquareIcon background={colour} className="mr-2" />    
            <b className="mr-auto"> {topic === 'NewSquare' ? 'Square Claim' : 'Colour Change'}</b>
        </Toast.Header>
        <Toast.Body>
            <Button
                variant='link'
                size='sm'
                onClick={handleClick}
            >
                Square  <b>#{id}</b>
            </Button>
            {topic === 'NewSquare' ? 'claimed with ' : 'changed to '} 
            colour <b>{colour}</b> 
            { date !== '' ? date.split(' ')[0] == today ? ' ' : ' on ' : ' ' } 
            <b>{date.split(' ')[0] == today ? 'today at ' + date.split(' ')[2] : date}</b>
        </Toast.Body>
    </Toast>
    )
}

export default EventToast