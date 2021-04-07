import { ethers } from "ethers"
import Flatland from "../../../build/contracts/Flatland.json"
import { bigNumberToNumber } from '../utils/utilityFunctions'

const blockchainReducer = (state, action) => {
    switch(action.type) {
        case 'LOAD': {
            return action.payload
        }
    case 'MINT': {
        return {
            ...state,
            totalSupply: state.totalSupply + 1,
            squares: 
                [ ...state.squares, action.colour ],
            ownedSquares: [...state.ownedSquares, action.id]
        }
    }

    case 'CHANGE': {
        return {
        	...state,
        	squares: action.payload
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
	    
	    // TODO migrate to eth_request_accounts
	    await window.ethereum.enable();

	    const provider = new ethers.providers.Web3Provider(window.ethereum)
	    const signer = provider.getSigner(0)
	    const providerRpc = new ethers.providers.JsonRpcProvider('https://ropsten.infura.io/v3/6c1af6d1f94e4ffa9226b0e60b719aa5')
	    // const signerRpc = providerRpc.getSigner()
	    const account = await signer.getAddress()
	    const networkId = await providerRpc.send('net_version', [])
	    const networkData = Flatland.networks[networkId]

	    if (!networkData) {
	        throw new Error('Smart contract not deployed to detected network.')
	    }

	    const abi = Flatland.abi
	    const address = networkData.address
	    const contract = new ethers.Contract(address, abi, signer)

	    if (!contract) {
	        throw new Error('No contract found!')
	    }

	    const maxSupply = await contract.getMaxSupply()
	    const totalSupply = await contract.totalSupply()

	    //LOAD ALL SQUARES
        let squares = await contract.getSquares()
        squares = squares.map(bigNumberToNumber)

	    //LOAD ACCOUNT-OWNED SQUARES
	    let ownedSquares = await contract.getSquaresIdsByOwner(account)
        ownedSquares = ownedSquares.map(bigNumberToNumber)

	    return {
	        connected: true,
	        contract: contract,
	        provider: provider,
	        squares: squares,
	        totalSupply: totalSupply,
	        maxSupply: maxSupply,
	        account: account,
	        ownedSquares: ownedSquares   
	    }

	}
	catch (e) {
	    console.log(e)
	    window.alert(e)
	}   

}



export { blockchainReducer, loadBlockchain }