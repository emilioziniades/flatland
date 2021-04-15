# Flatland🎨

<table>
<tr>
<td>
  A dapp built on the Ethereum blockchain. Collaborative pixel art using the ERC721 Non-Fungible Token standard.
</td>
</tr>
</table>

## Demo

[Here](https://flatland.gq) is a working live demo.

For testing purposes, earlier versions of Flatland will be deployed to the Ropsten Test Network. To use the app, you'll need a [Metamask](https://metamask.io/) wallet and some test Ether from a [faucet](https://faucet.ropsten.be/). Yay, free money!

## File structure

```
.
|–– README.md
|–– truffle-config.js
|–– package.json
|–– app
    |–– gatsby-config.js
    |–– package.json
    |–– static
    |–– src
        |–– components
        |–– content
        |–– images
        |–– pages
        |–– utils
        |–– static
|–– build
    |–– contracts
      |–– Flatland.json
|–– contracts
    |–– Flatland.sol
|–– migrations
|–– test
    |–– Flatland.test.js
```

## Local development

If you want to run a local version of this app on your computer, follow the steps below.

First, clone the repo

`git clone https://github.com/emilioziniades/flatland`

Change to the `flatland` directory and install the dependencies in `/flatland/` and `/flatland/app`

`cd flatland && npm install`

`cd app && npm install`

Remain in the `app` directory, and start the local development server

`gatsby develop`

Now, you should be able to visit `https://localhost:8000` in your browser and see a local instance of Flatland. Gatsby features hot reloading, so you can just make changes in the flatland/app/ directory and view the changes live.

## Built with

- [Gatsby](https://www.gatsbyjs.com/) - Static site generator written in JavaScript, and built using the React framework.

- [React](https://reactjs.org/) - Component based javascript framework. Includes support for state management. This project makes use of ES6 syntax, function components, and [hooks](https://reactjs.org/docs/hooks-overview.html)

- [React Bootstrap](https://react-bootstrap.github.io/) - A combination of React and Bootstrap, both front-end frameworks.

- [Ethers](https://docs.ethers.io/v5/) - Javascript library used to interact with Ethereum blockchain.

- [Truffle Suite](https://www.trufflesuite.com/) - Smart contract test, build and deploy suite. 

- [Ganache-CLI](https://www.trufflesuite.com/docs/ganache/overview) - Local blockchain for testing purposes.

- [Solidity](https://docs.soliditylang.org/en/v0.8.2/) - Smart contract programming language, compiles to the Ethereum Virtual Machine (EVM). [Crypto Zombies](https://cryptozombies.io/) is a good starting point for learning solidity.

## Contributing

Go ahead and have a look at the open issues. Clone the repo following the instructions above and try to fix the bug / implement the functionality. Create a pull request and link it to the issue that your pull request addresses. 


## Bug / Feature Request

If you find a bug, kindly open an issue [here](https://github.com/emilioziniades/flatland/issues/new) by including your search query and the expected result.

If you'd like to request a new feature, feel free to do so by opening an issue [here](https://github.com/emilioziniades/flatland/issues/new). 
