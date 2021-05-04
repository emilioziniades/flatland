import React, { useContext, useEffect, useState } from 'react'
import { Row, Table, Pagination, PageItem, Form } from 'react-bootstrap'
import { blockHeightToDate } from '../../utils/blockchainUtils'

import { BlockchainContext } from '../stateProvider'
import EventRow from './eventRow'
import { TableHead, Head, TableBody, TableRow } from '../SquareManager/tableComponents'


const CanvasHistory = () => {

    const { state, dispatch } = useContext(BlockchainContext)
    const { provider, connected, history, ownedSquares } = state

    const [checked, setChecked] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const eventsPerPage = 50

    const replaceBlockHeightWithDate = async () => {

        console.log('Starting date replacement')
        
        for (let i = 0; i < history.length; i++) {
            try {
                let newHistory = history
                const blockHeight = newHistory[i].blockHeight
                const date = await blockHeightToDate(blockHeight, provider)
                newHistory[i].date = date
                dispatch({type: 'UPDATE-LOGS', payload: newHistory})

            }
            catch (e) {

            }
        }

        console.log('finished date replacement')
    }

    useEffect(() => {
        if (connected) {
            replaceBlockHeightWithDate()
        } 
    }, [])

    let listUserEvents = []
    let events = history.map(element => {
        if (ownedSquares[element.id] > -1) {
            listUserEvents.push(element)
        }
        return(
            <EventRow data={element} key={element.txId} showID={true}/>
        )
    })

    console.log(listUserEvents)

    let userEvents = listUserEvents.map(element => {
        return(
            <EventRow data={element} key={element.txId} />
        )    
    })

    const lastEventOnPage = currentPage * eventsPerPage
    const firstEventOnPage = lastEventOnPage - eventsPerPage
    const eventsOnAllPage = events.slice(firstEventOnPage, lastEventOnPage)
    const eventsOnUserPage = userEvents.slice(firstEventOnPage, lastEventOnPage)
    const totalAllPages = Math.ceil(events.length/eventsPerPage)
    const totalUserPages = Math.ceil(userEvents.length/eventsPerPage)

    const allPageNumbers = [];
    for (let i = 1; i <= totalAllPages; i++) {
        allPageNumbers.push(i)
    }

    const userPageNumbers = [];
    for (let i = 1; i <= totalUserPages; i++) {
        userPageNumbers.push(i)
    }

    const handlePageClick = (page) => {
        setCurrentPage(page)
    }
 
    let allPages = allPageNumbers.map(page => {
        return(
            <PageItem key={page} active={page===currentPage} onClick={() => handlePageClick(page)}>
                {page}
            </PageItem>
        )
    })

    let userPages = userPageNumbers.map(page => {
        return(
            <PageItem key={page} active={page===currentPage} onClick={() => handlePageClick(page)}>
                {page}
            </PageItem>
        )
    })

    const handleToggle = () => {
        setCurrentPage(1)
        setChecked(!checked)
    }

    return(
        <Row className='justify-content-center mr-auto ml-auto p-2'>
        <Row>
            <h3 className='p-2'> Flatland History </h3>
            <Form>
                <Form.Check 
                    type="switch"
                    id='toggleUserHistory'
                    checked = {checked}
                    value="1"
                    onChange={handleToggle}
                    label={checked ?
                            'Show all transaction history'
                            :
                            'Only show my transaction history'}
                />
            </Form>
        </Row>
        <Table hover responsive>
            <TableHead>
                <TableRow>
                <Head> Event </Head>
                <Head> Square # </Head>
                <Head> Colour </Head>
                <Head> Date </Head>
                <Head> Receipt </Head>
                </TableRow>
            </TableHead>
            <TableBody>
                { checked ? eventsOnUserPage : eventsOnAllPage }
            </TableBody>
        </Table>
        <Pagination>
            { checked ? userPages : allPages }
        </Pagination>
        </Row>
        )
}

export default CanvasHistory