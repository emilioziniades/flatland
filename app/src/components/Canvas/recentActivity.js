import React, { useContext, useState, useEffect } from 'react'

import { BlockchainContext } from '../stateProvider'
import EventToast from '../CanvasHistory/eventToast'
import { batchEventBlockHeightToDate } from '../../utils/blockchainUtils'

const RecentActivity = () => {
    const { state } = useContext(BlockchainContext)
    const { account, history, provider } = state || {}
    const [loadingDates, setLoadingDates] = useState(true)

    let recentEvents = (history) ?
    history.slice(0,5).map((element) => { 
            return(
                <EventToast data={element} key={element.txId} />
            )
        })
    : ''
    
    const callBatchDateFunction = async() => {
        await batchEventBlockHeightToDate(recentEvents, provider)
        setLoadingDates(false)
    }


    // Unsure about using useEffect in this component

    // // setLoadingDates(true)
    // // callBatchDateFunction()
    useEffect(() => {
        if (account) {
            setLoadingDates(true)
            callBatchDateFunction()
            setLoadingDates(false)
        }
    }, [recentEvents, account])


    return(
        <div>
            <h5> Recent Activity </h5>
            {account ? recentEvents : <p> Not connected </p> }
        </div>
    )
}

export default RecentActivity