import React, { useContext, useEffect, useState } from 'react'
import { Row, Toast } from 'react-bootstrap'
import { ethers } from 'ethers'
import HashLoader from 'react-spinners/HashLoader'

import { BlockchainContext } from '../BlockchainContext'


const CanvasHistory = () => {

    const { state } = useContext(BlockchainContext)
    const { provider, contract, connected } = state
    const [ history, setHistory ] = useState([])
    const [ loading, setLoading ] = useState(false)

    const getSquareClaimHistory = async () => {
        
        setLoading(true)
        if (contract) {

            console.log('this is pretty fast')
            let topic = ethers.utils.id("NewSquare(uint256,uint256)")
            const filter = {
                address: contract.address,
                fromBlock: 0,
                topics: [ topic ]
            }
            const logs = await provider.getLogs(filter)
            console.log(logs)
            console.log(logs.reverse())
            const result = []
            let log 

            console.log('this is pretty fast')

            console.log('but this is pretty slow')

            for (log of logs) {
                const innerResult = []
                const blockData = await provider.getBlock(log.blockNumber)

                const date = new Date(blockData.timestamp * 1000)
                innerResult.push(date.toDateString())
                const data = log.data.slice(2,)
                const squareId = data.substring(0, (data.length/2))
                innerResult.push(parseInt(squareId, 16))
                let firstColour = data.substring((data.length/2))
                firstColour = '#' + firstColour.substring(firstColour.length - 6)
                innerResult.push(firstColour)

                console.log(innerResult)

                result.push(innerResult)
                setHistory(result)
            }
            console.log(result)
            // setHistory(result)

        }
        setLoading(false)
    }

    useEffect(() => {
        if (connected) {
        getSquareClaimHistory()
        }
    }, [connected]) //runs only if connection changes 

    return(<div>
    <Row className='justify-content-center'>
            <h3> {'Recent Activity \n'} </h3> 
            <HashLoader loading={loading} />
            </Row>
            <Row className = 'm-1'>
        {history.map((element, index) => {

            const [date, id, colour] = element
            return(
                <Toast key={element} className='m-1'>
                    <Toast.Header>
                        <b> Flatland Square Claim</b>
                    </Toast.Header>
                    <Toast.Body>
                    Square  <b>#{id}</b> claimed on <b>{date}</b> with colour <b>{colour}</b>
                    </Toast.Body>
                </Toast>
            )
        })}
    </Row>
    </div>)
}

export default CanvasHistory