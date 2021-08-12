import React, { useContext, useState } from 'react'
import { Table, Pagination, PageItem } from 'react-bootstrap'

import { BlockchainContext, SquareContext } from '../stateProvider'
import EventRow from '../CanvasHistory/eventRow'
import { TableHead, Head, TableBody, TableRow } from '../SquareManager/tableComponents'

const SquareHistory = () => {
    const { state } = useContext(BlockchainContext)
    const { history } = state
    const {selectedSquare} = useContext(SquareContext)

    let listSquareEvents = []
    const [currentPage, setCurrentPage] = useState(1)
    const eventsPerPage = 6
    

    for (let event of history) {
        if (event.id === selectedSquare) {
            listSquareEvents.push(event)
        }    
    }

    let columnTitles = ['Event', 'Colour', 'Date', 'Receipt']
    let headings = columnTitles.map(element => {
        return(
            <Head>
                {element}
            </Head>
        )
    })

    let squareEventsRows = listSquareEvents.map(element => {
        return(
            <EventRow data={element} key={element.txId} showID={false}/>
        )
    }) 

    const lastEventOnPage = currentPage * eventsPerPage
    const firstEventOnPage = lastEventOnPage - eventsPerPage
    const eventsOnPage = squareEventsRows.slice(firstEventOnPage, lastEventOnPage)
    const totalPages = Math.ceil(squareEventsRows.length/eventsPerPage)

    const pageNumbers = []
    for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i)
    }

    const handlePageClick = (page) => {
        setCurrentPage(page)
    }

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

export default SquareHistory