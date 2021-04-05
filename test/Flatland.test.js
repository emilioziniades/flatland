const { assert } = require('chai')
const BigNumber = require('bignumber.js');

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
            const result = await contract.mint(0xBBBBBB)
            const totalSupply = await contract.totalSupply()
           
            // SUCCESS
            assert.equal(totalSupply, 1)
            const event = result.logs[0].args
            assert.equal(event.tokenId.toNumber(), 1, 'id is correct')
            assert.equal(event.from, '0x0000000000000000000000000000000000000000', 'from is correct' )
            assert.equal(event.to, accounts[0], 'to is correct')
        })

        it('updates owner square count', async() => {
            const ownerSquareCount = await contract.balanceOf(accounts[0])
            assert.equal(ownerSquareCount, 1)
        })

        it('prevents someone from obtaining more squares', async() => {
            await contract.mint('#CCCCCC').should.be.rejected;
        })

        })
    
    describe('indexing', async () => {
        it('lists squares', async() => {
            await contract.mint(0xFAC8CD, { from: accounts[1]})
            await contract.mint(0x98B6B1, { from: accounts[2]})
            await contract.mint(0x629677, { from: accounts[3]})

            const totalSupply = await contract.totalSupply()

            let square
            let result = []

            for (var i = 1; i <= totalSupply; i++) {
                square = await contract.squares(i-1)
                result.push(square)
            }

            let expected = [0xBBBBBB,0xFAC8CD, 0x98B6B1, 0x629677]
            assert.equal(result.join(','), expected.join(','))
        })

        it('can fetch squares by owner', async() => {
            const squareIds = await contract.getSquaresIdsByOwner(accounts[0])
            assert.equal(squareIds, 1)

            const ownerSquareColours = await contract.getSquareColoursFromIds(squareIds)
            assert.equal(ownerSquareColours, 0xBBBBBB)
        })
        
        it('can fetch max supply', async () => {
            const maxSupply = await contract.getMaxSupply()
            assert.equal(256, maxSupply)
        })
    })

    describe('changing colour', async() => {

        it('can change square colour', async() => {

            //Change colour of first square

            await contract.changeColour(1, 0xCCCCCC)
            squareOne = await contract.squares(0)
            assert.equal(squareOne.toNumber(), 0xCCCCCC)
            
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

            let expected = [0xCCCCCC,0xFAC8CD, 0x98B6B1, 0x629677]
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


