import React from 'react'
import { ropstenLinkMaker } from '../../utils/blockchainUtils'

const EtherscanLink = ({ hash, type, message, abbreviate }) => {

    const link = ropstenLinkMaker(hash, type)
    const txHash = ( abbreviate ? hash.slice(0,8) + '...' : hash )

    return(
        <p> 
            {message}
                <a href={link}>
                    {txHash}
                </a> 
        </p>
    )

}

export default EtherscanLink