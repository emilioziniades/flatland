import React, { useContext } from 'react'

import { BlockchainContext } from '../stateProvider'
import EventToast from '../CanvasHistory/eventToast'

const RecentActivity = () => {
    const { state } = useContext(BlockchainContext)
    const { account, history } = state || {}

    let recentEvents = (history) ?
    history.slice(0,5).map((element) => {
            return(
                <EventToast data={element} key={element.txId} />
            )
        })
    : ''

    return(
        <div>
            <h5> Recent Activity </h5>
            {account ? recentEvents : <p> Not connected </p> }
        </div>
    )
}

export default RecentActivity