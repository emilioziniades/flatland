
      // async loadBlockchainData() {
      //   const web3 = window.web3
      //   // Load account
      //   // This function detects most providers injected at window.ethereum
      //   if (provider) {
      //     // From now on, this should always be true:
      //     // provider === window.ethereum

      //   } else {
          
      //   }
    
      //   // const networkId = await provider.request({method: 'net_version' })
      //   // const networkData = Flatland.networks[networkId]
      //   if(networkData) {
      //     const abi = Flatland.abi
      //     const address = networkData.address
      //     const contract = new web3.eth.Contract(abi, address)
      //     this.setState({ contract })
      //     const totalSupply = await contract.methods.totalSupply().call()
      //     this.setState({ totalSupply })
      //     //Load colours
      //     for (var i = 1; i <= totalSupply; i++) {
      //       const square = await contract.methods.squares(i-1).call()
      //       this.setState({
      //         squares: [...this.state.squares, square]
      //       })
      //   }
    
      //   //Check if visitor owns squares already
      //   const ownerSquareCount = await this.state.contract.methods.ownerSquareCount(this.state.account).call()
      //   console.log(ownerSquareCount)
    
      //   this.setState({ ownedSquares: ownerSquareCount})
    
      //   }
      //   else {
      //     window.alert('Smart contract not deployed to detected network.')
      //   }
      //   console.log(this.state)
      // }
    
    //   mint = (square) => {
    //     if (this.state.contract) {
    //       this.state.contract.methods.mint(square).send({ from: this.state.account })
    //       .once('receipt', (receipt) => {
    //         this.setState({
    //           squares: [...this.state.squares, square],
    //           totalSupply: this.state.totalSupply + 1
    //         })
    //         //  ** Different way of changing total supply state? **
    //         // this.state.contract.methods.totalSupply().call().then((result) => {
    //         //   this.setState({ totalSupply: result })
    //         // })
    //       })
    
    //     }
    //     else {console.log("Contract not found!")}
    
    //     // Event listener that updates squares once minted
    //     this.state.contract.events.NewSquare()
    //       .on("data", async() => {
    //         this.colourCanvas()
    //       }
    //     )
    
    //   }
    
    //   async colourCanvas() {
    //     for (var i = 1; i <= this.state.totalSupply; i++ ) {
    //       const square = await this.state.squares[i-1]
    //       const nodeId = "#node-".concat(i)
    //       console.log(nodeId)
    //       console.log(square)
    //       $(nodeId).css("background-color", square)
    //     }
    //   }
    
    

