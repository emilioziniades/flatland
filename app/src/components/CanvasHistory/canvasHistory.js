import React, { useContext, useEffect, useState } from 'react'
import { Row } from 'react-bootstrap'
import { ethers } from 'ethers'
import HashLoader from 'react-spinners/HashLoader'

import { BlockchainContext } from '../BlockchainContext'
import EventToast from './eventToast'


const CanvasHistory = () => {

    const { state } = useContext(BlockchainContext)
    const { provider, contract, connected } = state

    const [ history, setHistory ] = useState([])
    const [ loading, setLoading ] = useState(false)

    let claimTopic = ethers.utils.id("NewSquare(uint256,uint256)")

    const getSquareClaimHistory = async () => {
        
        setLoading(true)
        if (contract) {

            console.log('this is pretty fast')
            const filterHistorical = {
                address: contract.address,
                fromBlock: 0,
                topics: [ claimTopic ]
            }
            const logs = await provider.getLogs(filterHistorical)
            console.log(logs)
            console.log(logs.reverse())
            const result = []
            let log 

            console.log('this is pretty fast')

            console.log('but this is pretty slow')

            let counter = 1
            for (log of logs) {

                const innerResult = []

                const blockData = await provider.getBlock(log.blockNumber)
                const date = new Date(blockData.timestamp * 1000)
                innerResult.push(date.toLocaleDateString() + ' at ' + date.toLocaleTimeString())
                
                const data = log.data.slice(2,)
                const squareId = data.substring(0, (data.length/2))
                innerResult.push(parseInt(squareId, 16))

                let firstColour = data.substring((data.length/2))
                firstColour = '#' + firstColour.substring(firstColour.length - 6)
                innerResult.push(firstColour)

                console.log(innerResult)
                result.push(innerResult)

                if (counter == 6) {
                    setHistory(result)
                }
                counter++
            }
            console.log(result)
            setHistory(result)

        }
        setLoading(false)
    }
    

    useEffect(() => {
        if (connected) {
        getSquareClaimHistory()
        }
    }, [connected]) //runs only if connection changes 

if (connected) {
    const filter = {
            address: contract.address,
            topics: [ claimTopic ]
        }
        provider.on(filter, (e) => {
            console.log(e)
            getSquareClaimHistory()
        })
    }


    return(<div>
    <Row className='justify-content-center'>
            <h3 className='p-2'> {'Recent Activity \n'} </h3> 
            <HashLoader loading={loading} />
            </Row>
            <Row className = 'm-1'>
        {history.map((element, index) => {
            return(
                <EventToast data={element} toastKey={index} />
            )
        })}
    </Row>
    </div>)
}

export default CanvasHistory