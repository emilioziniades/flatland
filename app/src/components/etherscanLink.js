import React from 'react'
import { ropstenLinkMaker } from '../utils/blockchainUtils'

const EtherscanLink = ({ address, type }) => {

    const link = ropstenLinkMaker(address, type)

    return(
        <a href={link}> {address} </a>
    )

}

export default EtherscanLink