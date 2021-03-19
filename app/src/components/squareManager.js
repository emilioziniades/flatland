import React from "react";

export default class SquareManager extends React.Component {

    render() {
        if (this.props.account) {
            return( 
                <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                    <h2 className="p5"> You don't currently own squares. Claim one below... </h2>
                    <p> Next square to claim: {this.props.squares.length + 1}</p>
                    <p> Choose a <a href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">hexidecimal</a> colour for your square </p>       
                    <form onSubmit={(event) => {
                        event.preventDefault()
                        const square = this.square.value
                        this.props.mint(square)
                    }}>
                        <input 
                        type="text"
                        className= "form-control mb-1"
                        placeholder= "e.g. #FFFFFF"
                        ref={(input) => {this.square = input}}
                        />
                        <input 
                        type='submit' 
                        className='btn btn-block btn-primary'
                        value= 'MINT'
                        />
                    </form>
                </div>  
            </main>
        )
        }
        else {
            return(     
            <main role="main" className="col-lg-12 d-flex text-center">
                <div className="content mr-auto ml-auto">
                    <h2 className="p5"> Get started by connecting your account! </h2>
                </div>  
            </main>)
        }
    return(
      <main role="main" className="col-lg-12 d-flex text-center">
      <div className="content mr-auto ml-auto">
            <h2 className="p5"> {this.props.account ? "u own no squares" : "connect your account" }</h2>
       
       {/* <p> Next square to claim: {this.state.squares.length + 1}</p>
       <p> Choose a <a href="https://en.wikipedia.org/wiki/Web_colors#Hex_triplet">hexidecimal</a> colour for your square </p>       
       <form onSubmit={(event) => {
         event.preventDefault()
         const square = this.square.value
         this.mint(square)
       }}>
         <input 
          type="text"
          className= "form-control mb-1"
          placeholder= "e.g. #FFFFFF"
          ref={(input) => {this.square = input}}
          />
        <input 
        type='submit' 
        className='btn btn-block btn-primary'
        value= 'MINT'
        />
       </form> */}
      </div>
    </main>
    )
    }
  }