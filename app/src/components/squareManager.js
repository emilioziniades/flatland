import React, { useContext } from "react"
import { Container, Row, Col } from "react-bootstrap"
import styled from "styled-components"


import MintForm from './forms/mintForm'
import ManageForm from './forms/manageForm'
import { BlockchainContext } from './BlockchainContext'

const Square = styled.div`
    padding: 0em;
    border: 0.1px solid #000000;
    text-align: center;
    height: 16px;
    width: 16px;
    ${props => `background: ${props.background};`}
    `
    
const SquareManager = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)

    const OwnsSquares  = (props) => {

        // TODO : this code assumes that the account only owns one square. for now, that's
        // built into the smart contract. if that changes, this code would need to 
        // handle arrays of colours, not just one


        const SquareHandler = (props) => {

            // const squareColour = (props.squareId) => {
            //     const squareColour = state.squares[props.squareId -1]
            //     return '#' + squareColour.toString(16)
            // }
            console.log(state.squares)
            console.log(props.squareId)

            const squareColour = state.squares[props.squareId -1]
            const squareHex = '#' + squareColour.toString(16)
            return (<main role="main" className="col-lg-12 d-flex text-center">
                    <div className="content mr-auto ml-auto">
    
                        <Row className="justify-content-center align-items-center"> 
                        <Col className="d-flex justify-content-center">
                            <h4 className="m-1"> Square {props.squareId ? props.squareId : "-"} </h4>
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <Square
                                background={squareHex} />
                        </Col>
                        <Col className="d-flex justify-content-center">
                            <p><i> current colour : {squareHex ? squareHex : "-"}</i></p>
    
                        </Col>
                        </Row>
                        <ManageForm 
                            squareId= {props.squareId}
                        />
                    </div>  
                </main>)
        }

        return (
            <Row className="justify-content-center p-2">
            <Row>
                <h3 className="p-2"> Looks like you own {state.ownedSquares.length == 1 ? 'a square' : 'squares'}! Manage here </h3>
            </Row>
            {state.ownedSquares.map((squareId) => <SquareHandler squareId={squareId} /> )}
            </Row>
    )}

    const MintSquares = (props) => {
        return(
            <Row>
             <main role="main" className="col-lg-12 d-flex text-center p-2">
                <div className="content mr-auto ml-auto">
                    <h3 className="p5"> { state.ownedSquares.length > 0 ? "or .. mint another square here" : "You dont currently own squares. Claim one here..."} </h3>
                    <p> Next square to claim: {state.squares.length + 1}</p>
                    <p> Choose a <a href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">hexidecimal</a> colour for your square </p>       
                    <MintForm />
                </div>  
            </main> 
            </Row>
        )}

    const MissingData = (props) => {
        return(
            <Row>
            <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                    <h2 className="p5"> {props.message} </h2>
                </div>  
            </main>
            </Row>
        )}

    return(
        <Container> 
        {state.account ?
        //Account is connected 
            state.contract ?
                //Contract is deployed on current blockchain
                state.ownedSquares.length > 0 ?
                    //Account owns squares, let them manage
                             <div>
                             <OwnsSquares/>
                             <MintSquares/>
                             </div>
                    // Account owns no squares, let them mint
                    : <MintSquares/>
                // Smart contract is NOT deployed to this network
                : <MissingData 
                    message="Oh no ... it looks like the Flatland smart contract isn't deployed to this network. Try connecting to localhost:8545" />
            // Account isn't connected
            : <MissingData
                message="Get started by connecting your account!" /> }
            </Container> 

        )

        }

export default SquareManager
        