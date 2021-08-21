import React, { useContext, useEffect, useState } from 'react'
import { Table, Pagination, PageItem } from 'react-bootstrap'

import { BlockchainContext, SquareContext } from '../stateProvider'
import EventRow from '../CanvasHistory/eventRow'
import { TableHead, Head, TableBody, TableRow } from '../SquareManager/tableComponents'
import { batchEventBlockHeightToDate } from '../../utils/blockchainUtils'

const SquareHistoryTable = () => {
    const { state } = useContext(BlockchainContext)
    const { history, provider } = state
    const { selectedSquare } = useContext(SquareContext)

    let listSquareEvents = []
    const [currentPage, setCurrentPage] = useState(1)
    const eventsPerPage = 6
    const [loadingDates, setLoadingDates] = useState(true)

    for (let event of history) {
        if (event.id === selectedSquare) {
            listSquareEvents.push(event)
        }    
    }

    let columnTitles = ['Event', 'Colour', 'Date', 'Receipt']
    let headings = columnTitles.map(element => {
        return(
            <Head key={element}>
                {element}
            </Head>
        )
    })

    let squareEventsRows = listSquareEvents.map(element => {
        //let squareEventKey = element.txId.concat('_squarehx')
        return(
            <EventRow data={element} key={element.txId} showID={false}/>
        )
    }) 

    const lastEventOnPage = currentPage * eventsPerPage
    const firstEventOnPage = lastEventOnPage - eventsPerPage
    const listSquareEventsOnPage = listSquareEvents.slice(firstEventOnPage, lastEventOnPage)
    const eventsOnPage = squareEventsRows.slice(firstEventOnPage, lastEventOnPage)
    const totalPages = Math.ceil(squareEventsRows.length/eventsPerPage)

    const callBatchDateFunction = async() => {
        await batchEventBlockHeightToDate(listSquareEventsOnPage, provider)
        setLoadingDates(false)
    }
    
    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const handlePageClick = (page) => {
        setCurrentPage(page)
        setLoadingDates(true)
    }

    useEffect(() => {
        if (listSquareEvents.length > 0) {
            callBatchDateFunction()
        }
    }, [listSquareEventsOnPage, listSquareEvents])

    let pages = pageNumbers.map(page => {
        return(
            <PageItem key={page} active={page===currentPage} onClick={() => handlePageClick(page)}>
                {page}
            </PageItem>    
        )
    })

    return (
        <span>
            { listSquareEvents.length ? 
            <div>
                <Table>
                    <TableHead>
                        <TableRow>
                            { headings }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        { eventsOnPage }
                    </TableBody>
                </Table>
                { totalPages > 1 ?
                    <Pagination>
                        {pages}
                    </Pagination>
                    :
                    <div></div>
                }
            </div>
            : 
            
            <h4><i>This square has no history :(</i></h4>}
        </span>
    )    
}

export default SquareHistoryTable