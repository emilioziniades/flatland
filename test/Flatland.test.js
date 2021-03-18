const { describe, it } = require('@ungap/global-this');
const { assert } = require('chai')

const Flatland = artifacts.require('./Flatland.sol')

require('chai')
    .use(require('chai-as-promised'))
    .should()

contract('Flatland', (accounts) => {
    let contract;

    before(async () => {
        contract = await Flatland.deployed()
    })
    describe('deployment', async() => {
        it('deploys successfully', async() => {
            const address = contract.address
            assert.notEqual(address, '')
            assert.notEqual(address, 0x0)
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)   
        })

        it('has a name', async() => {
            const name = await contract.name()
            assert.equal(name, 'Flatland')
        })

        it('has a symbol', async() => {
            const symbol = await contract.symbol()
            assert.equal(symbol, 'FLATLAND')
        })
    })

    describe('minting', async() => {
        it('creates a new token', async() => {
            const result = await contract.mint('#BBBBBB')
            const totalSupply = await contract.totalSupply()
           
            // SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct' )
            assert.equal(event.to, accounts[0], 'to is correct')
        })

        // it('prevents someone from obtaining more squares', async() => {
        //     const count = await contract.getOwnerSquareCount(accounts[0])
        //     console.log(count)
        //     await contract.mint('#CCCCCC').should.be.rejected;
        // })

        })
    
    describe('indexing', async () => {
        it('lists squares', async() => {
            await contract.mint('#FAC8CD')
            await contract.mint('#98B6B1')
            await contract.mint('#629677')

            const totalSupply = await contract.totalSupply()

            let square
            let result = []

            for (var i = 1; i <= totalSupply; i++) {
                square = await contract.squares(i-1)
                result.push(square)
            }

            let expected = ['#BBBBBB','#FAC8CD', '#98B6B1', '#629677']
            assert.equal(result.join(','), expected.join(','))
        })
    })

    describe('changing colour', async() => {

        it('can change square colour', async() => {

            //Change colour of first square

            contract.changeColour(1, "#CCCCCC")
            squareOne = await contract.squares(0)
            assert.equal(squareOne, "#CCCCCC")
            
        })

        it('maintains square order', async() => {

            //Same indexing loop as above
            const totalSupply = await contract.totalSupply()
            let square
            let result = []

            for (var i = 1; i <= totalSupply; i++) {
                square = await contract.squares(i-1)
                result.push(square)
            }

            let expected = ['#CCCCCC','#FAC8CD', '#98B6B1', '#629677']
            assert.equal(result.join(','), expected.join(',') )
        })








    })
        // describe('restricting supply', async() => {
        
    //     it('prevents more than maximumSupply', async () => {
    //         //Work out how many tokens have been minted by this point

    //         let square
    //         let result = []

    //         const totalSupply = await contract.totalSupply()
    //         const maxSupply = await contract.getMaxSupply()

    //         console.log(totalSupply)
    //         console.log(maxSupply)

    //         for (var i = 1; i < maxSupply; i++ ) {
    //             await contract.mint("#FFFABBC")
    //             }

    //         for (var i = 1; i <= totalSupply; i++) {
    //             square = await contract.squares(i-1)
    //             result.push(square)
    //         }
    //         console.log(result)
    //         await contract.mint('#BBBBBB').should.be.rejected;

    //     })
    // })
})


