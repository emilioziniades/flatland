import React from "react";
import { Container, Row } from "react-bootstrap";
import { ethers } from "ethers";
import $ from "jquery"

import Flatland from "../../../build/contracts/Flatland.json";
import Header from './header';
import Hero from './hero';
import Canvas from './canvas';
import SquareManager from './squareManager';
import { async } from "@ungap/global-this";

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.state = {       
        account: '',
        contract: null,
        totalSupply: 0,
        squares: [],
        ownedSquares: 0
        };
    }

        loadBlockchain = async() => {
            console.log("Button clicked!");
            if (window.ethereum) { 
                console.log("Found window.ethereeum")
                await window.ethereum.enable();
                // A Web3Provider wraps a standard Web3 provider, which is
                // what Metamask injects as window.ethereum into each page
                const provider = new ethers.providers.Web3Provider(window.ethereum)

                // The Metamask plugin also allows signing transactions to
                // send ether and pay to change state within the blockchain.
                // For this, you need the account signer...
                const signer = provider.getSigner(0)
    
                // JsonRpcProvider defaults to localhost:8545
                const providerRpc = new ethers.providers.JsonRpcProvider();
                const signerRpc = providerRpc.getSigner();
                

                // update account
                const account = await signer.getAddress()
                this.setState({account})

                // update nework
                const networkId = await providerRpc.send('net_version', [])
                const networkData = Flatland.networks[networkId]
                if(networkData) {
                    const abi = Flatland.abi;
                    const address = networkData.address;

                    // CHANGE THIS TO FIT WITH ETHERS
                    const contract = new ethers.Contract(address, abi, signer)
                    this.setState({contract})

                    // contract.mint("#444555")
                    // contract.mint("#444555")
                    const totalSupply = await contract.totalSupply()
                    this.setState({ totalSupply })

                    //Load colours
                    for (var i = 1; i <= totalSupply; i++) {
                      const square = await contract.squares(i-1)
                      console.log(square)
                      const localSquares = this.state.squares;
                      localSquares.push(square)
                      this.setState({squares: localSquares})
                    }
                    this.colourCanvas()
                }
                else {
                    window.alert('Smart contract not deployed to detected network.')
                }


            }
            else if (window.web3) {
                console.log("we got a window.web3");
            }
            else {
                window.alert('Non-Ethereum browser detected. You should consider trying MetaMask!');
                console.log('No wallet found');
            }
    }
        colourCanvas = async() => {
        for (var i = 1; i <= this.state.totalSupply; i++ ) {
          const square = await this.state.squares[i-1]
          const nodeId = "#node-".concat(i)
          console.log(nodeId)
          console.log(square)
          $(nodeId).css("background-color", square)
        }
      }
        mint = (square) => {
                if (this.state.contract) {
                  this.state.contract.mint(square)
                  .then('receipt', (receipt) => {
                    this.setState({
                      squares: [...this.state.squares, square],
                      totalSupply: this.state.totalSupply + 1
                    })
                    //  ** Different way of changing total supply state? **
                    // this.state.contract.methods.totalSupply().call().then((result) => {
                    //   this.setState({ totalSupply: result })
                    // })
                  })
            
                }
                else {console.log("Contract not found!")}
            
                // Event listener that updates squares once minted
                // this.state.contract.events.NewSquare()
                //   .on("data", async() => {
                //     this.colourCanvas()
                //   }
                // )

        }

    render() {
        return(
        <div>
        < Header 
            loadBlockchain={this.loadBlockchain}
            account={this.state.account}/>                    
        <Container>
            <Row>
                <Hero />
            </Row>
            <Row>
                <Canvas />
            </Row>
            <hr />
            <Row>
                <SquareManager 
                    account={this.state.account} 
                    squares={this.state.squares}
                    mint={this.mint} />
            </Row>
        </Container>
        </div>)
    }
}
