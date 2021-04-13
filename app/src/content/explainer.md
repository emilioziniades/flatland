---
slug: "/explainer"
title: "Flatland : An Explainer"
date: "2021-04-13"
---

## What is this?

Flatland is a collaborative art project on the Ethereum blockchain. The area consists of 256 squares (*Note*: for now). Anyone can claim a square. Once you own a square, you may change its colour as frequently as desired. Squares may also be bought and sold in the secondary market, like other Non-Fungible Tokens.

Flatland has some similarities to [Place](https://en.wikipedia.org/wiki/Place_(Reddit)), a collaborative pixel art project on Reddit. The difference is that Flatland's state persists on the Ethereum blockchain. In addition, one must own a square in order to change its colour, either by claiming it or buying it from someone else. 

On the first day of every month, a snapshot is taken of the Flatland canvas. This is minted as an NFT, collectively owned by the individual square owners. Interested parties may submit bids for these Flatland Canvas NFTs. Each bid is voted on by the square owners on a one-square one-vote basis. The funds from sold Canvases are split equally among square owners.

Yes, this project derives its title from the novella [Flatland: A Romance of Many Dimensions](https://en.wikipedia.org/wiki/Flatland), but it does not retain its namesake's Victorian hierarchical ideas. On this Flatland, we're all squares.

## How to get involved

Anyone can claim a square! All you need is a [Metamask](https://metamask.io/) wallet. Once you have added the Metamask plugin to your browser, connect your wallet to the Flatland app.

Ensure that you have some funds in your wallet. In order to update the Flatland state, you must pay the gas fees associated with the computation. Choose an initial colour and submit the transaction, confirming the Metamask pop-up as well.

(*Note*: currently Flatland is in beta testing, and is deployed to the Ropsten test network. In order to try out Flatland, you will need some test Ether. Get some from a [faucet](https://faucet.ropsten.be/))

## Going forward

- 0.1 (**current**) : claim squares and change their colours

- 0.2 : Monthly Canvas NFT created, including a mechanism for bidding and voting on bids

- 0.3 : Ability for artists to submit proposals for fixed period, conditional on square-owner consesus

## Technical details

The source code for this project is open source. View it on [GitHub](https://github.com/emilioziniades/flatland).

Flatland uses the ERC-721 standard – a standard for Non-Fungible Tokens. This allows Flatland Squares, as well as Flatland Canvases, to be bought and sold on established secondary NFT markets.
