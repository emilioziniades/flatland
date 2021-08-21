import React, { useContext, useEffect, useState } from 'react'
import { Row, Table, Pagination, PageItem, Form } from 'react-bootstrap'
import { batchEventBlockHeightToDate } from '../../utils/blockchainUtils'

import { BlockchainContext } from '../stateProvider'
import EventRow from './eventRow'
import { TableHead, Head, TableBody, TableRow } from '../SquareManager/tableComponents'


const CanvasHistory = () => {

    const { state } = useContext(BlockchainContext)
    const { provider, history, ownedSquares } = state

    const [checked, setChecked] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    const [loadingDates, setLoadingDates] = useState(true)
    const eventsPerPage = 30

        let listUserEvents = []
    let allEvents = history.map(element => {
        if (ownedSquares[element.id] > -1) {
            listUserEvents.push(element)
        }
        return(
            <EventRow data={element} key={element.txId} showID={true}/>
        )
    })

    let userEvents = listUserEvents.map(element => {
        return(
            <EventRow data={element} key={element.txId} showID={true}/>
        )    
    })

    const lastEventOnPage = currentPage * eventsPerPage
    const firstEventOnPage = lastEventOnPage - eventsPerPage
    let indexEvents = checked ? listUserEvents.slice(firstEventOnPage, lastEventOnPage) : history.slice(firstEventOnPage, lastEventOnPage)
    const eventsOnAllPage = allEvents.slice(firstEventOnPage, lastEventOnPage)
    const eventsOnUserPage = userEvents.slice(firstEventOnPage, lastEventOnPage)
    const totalAllPages = Math.ceil(allEvents.length/eventsPerPage)
    const totalUserPages = Math.ceil(userEvents.length/eventsPerPage)
    
    const callBatchDateFunction = async() => {
        await batchEventBlockHeightToDate(indexEvents, provider)
        setLoadingDates(false)
    }
    
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
        setLoadingDates(true)
    }

    useEffect(() => {
        callBatchDateFunction()
    }, [currentPage, checked, allEvents, userEvents])
 
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
        setLoadingDates(true)
    }

    let columnTitles = ['Event', 'Square #', 'Colour', 'Date', 'Receipt']
    let headings = columnTitles.map(element => {
        return(
            <Head key={element}>
                {element}
            </Head>
        )
    })

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
                            'showing only my transaction history'
                            :
                            'showing all transaction history'}
                />
            </Form>
        </Row>
        <Table hover responsive>
            <TableHead>
                <TableRow>
                    { headings }
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