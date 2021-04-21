import React from 'react'
import { ropstenLinkMaker } from '../../utils/blockchainUtils'

const EtherscanLink = ({ hash, type, message }) => {

    const link = ropstenLinkMaker(hash, type)

    return(
        <p> 
            {message}
                <a href={link}>
                    {hash}
                </a> 
        </p>
    )

}

export default EtherscanLink