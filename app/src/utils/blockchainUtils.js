import { ethers } from 'ethers'
import Flatland from '../../../build/contracts/Flatland.json'
import { bigNumberToNumber } from '../utils/utilityFunctions'

const blockchainReducer = (state, action) => {
    switch(action.type) {

    case 'LOAD': {
        return action.payload
    }

    case 'MINT': {

		let newOwnedSquares = state.ownedSquares
		newOwnedSquares[action.id] = action.colour

        return {
            ...state,
            totalSupply: state.totalSupply + 1,
            squares: 
                [ ...state.squares, action.colour ],
            ownedSquares: newOwnedSquares
        }
    }

	case 'MINT-REMOTE': {
		return {
			...state,
			totalSupply: state.totalSupply + 1,
			squares: [ ...state.squares, action.colour ],
		}
	}

    case 'CHANGE': {
        return {
        	...state,
        	squares: action.squares,
        	ownedSquares: action.mySquares,
        }
    }

	case 'CHANGE-REMOTE': {

		let newSquares = state.squares
		newSquares[action.id - 1 ] = action.colour

		return {
			...state,
			squares: newSquares,
		}
	}

    case 'LOGOUT': {
        return {
            connected: false,
            contract: null,
            provider: null,
            squares: [],
            totalSupply: 0,
            maxSupply: 0,
            account: '',
            ownedSquares: {},
			history: [],
        }
    }

	case 'UPDATE-LOGS': {
		return {
			...state,
			history: action.payload
		}
	}

	case 'APPEND-LOGS': {
		return {
			...state,
			history: [action.payload, ...state.history]
		}
	}

	case 'CHANGE-ACCOUNT': {
		return {
			...state,
			account: action.payload
		}
	}

	default:
		return state;
  }
}

const loadBlockchain = async () => {

	try {

	    if (!window.ethereum) { 
	        throw new Error('Non-Ethereum browser detected. You should consider trying MetaMask!')
	    }
	    
		// CONNECT TO METAMASK
		const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })
		const account = accounts[0]

		// LOAD PROVIDERS AND SIGNERS
	    const provider = new ethers.providers.Web3Provider(window.ethereum)
	    const signer = provider.getSigner(0)

		// CHECK NETWORK AND EXISTENCE OF SMART CONTRACT ON NETWORK
		const networkInfo = await provider.getNetwork()
	    const networkData = Flatland.networks[networkInfo.chainId]

	    if (!networkData) {
	        throw new Error('Smart contract not deployed to detected network. Connect to Ropsten Test Network')
	    }

		// CONTRACT DETAILS
	    const abi = Flatland.abi
	    const address = networkData.address
	    const contract = new ethers.Contract(address, abi, signer)

	    if (!contract) {
	        throw new Error('No contract found!')
	    }

	    let maxSupply = await contract.getMaxSupply()
		maxSupply = bigNumberToNumber(maxSupply)
	    
	    let totalSupply = await contract.totalSupply()
	    totalSupply = bigNumberToNumber(totalSupply)


	    //LOAD ALL SQUARES
        let squares = await contract.getSquares()
        squares = squares.map(bigNumberToNumber)

	    //LOAD ACCOUNT-OWNED SQUARES
	    let ownedSquares = await contract.getSquaresIdsByOwner(account)
		ownedSquares = ownedSquares.map(bigNumberToNumber)
		let result = {}
		ownedSquares.forEach((item, index, array)=>{
			result[item] = squares[item - 1]
		})

		// FETCH AND PARSE LOGS

		const filter = {
			address: contract.address,
			fromBlock: 0,
			topics: [[ claimTopic, changeTopic ]] //claims OR colour changes
		}
		
		const logs = await provider.getLogs(filter)
		logs.reverse()
		const cleanLogs = parseLogs(logs)

	    return {
	        connected: true,
	        contract: contract,
	        provider: provider,
	        squares: squares,
	        totalSupply: totalSupply,
	        maxSupply: maxSupply,
	        account: account,
	        ownedSquares: result,
			history: cleanLogs,
	    }

	}
	catch (e) {
	    console.log(e)
	    window.alert(e)
	}   

}

const ropstenLinkMaker = (address, type) => {
    const baseSlug = 'https://ropsten.etherscan.io/' + type + '/'
    return baseSlug + address
}

const parseLogs = (logs) => {
	const logsCleaned = []

		for (let log of logs) {

			const eventObj = {}

			// note, after full load, app will replace block heights with actual dates
			eventObj['date'] = log.blockNumber

			const data = log.data.slice(2,)
			const id = data.substring(0, (data.length/2))
			eventObj['id'] = parseInt(id, 16)

			let colour = data.substring((data.length/2))
			colour = '#' + colour.substring(colour.length - 6)
			eventObj['colour'] = colour

			eventObj['txId'] = log.transactionHash

			if (log.topics[0] === claimTopic) {
				eventObj['topic'] = 'NewSquare'
			}
			else if (log.topics[0] === changeTopic) {
				eventObj['topic'] = 'ColourChange'
			}

			// console.log(eventObj)
			logsCleaned.push(eventObj)

		}

		return logsCleaned
}

const blockHeightToDate = async (blockHeight, provider) => {

	const blockData = await provider.getBlock(blockHeight)
	let date = new Date(blockData.timestamp * 1000)
	date = date.toLocaleDateString() + ' at ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'})
	return date
}

const claimTopic = ethers.utils.id('NewSquare(uint256,uint256)')
const changeTopic = ethers.utils.id('ColourChange(uint256,uint256)')


export { blockchainReducer, loadBlockchain, ropstenLinkMaker, parseLogs, blockHeightToDate, claimTopic, changeTopic }