import React, { useContext } from 'react'
import $ from 'jquery'
import GridItem from './gridItem'
import { BlockchainContext } from '../BlockchainContext'

const Square = (props) => {

    const { state, dispatch } = useContext(BlockchainContext)
    const {isSquareClicked, clickedSquare} = state

    const activeCss = {
        'border': '2px solid black',
    }

    const inactiveCss = {
        'border': 'none',
    }

    const handleClick = (e) => {

        console.log(e)

        if (isSquareClicked && clickedSquare === props.id ) {
            $('#'+ props.id).css(inactiveCss)
            dispatch({type: 'UNCLICK-SQUARE', previousSquare: props.id})
        }

        else if (isSquareClicked && clickedSquare !== props.id) {
            $('#'+ clickedSquare).css('border', 'none')
            $('#'+ props.id).css(activeCss)
            dispatch({type: 'CLICK-SQUARE', clickedSquare: props.id})
        }
        else {
            //No square is clicked
            $('#'+ props.id).css(activeCss)
            dispatch({type: 'CLICK-SQUARE', clickedSquare: props.id})
 
        }

    }

    const handleEnter = (e) => {
        e.target.style.opacity = '0.5'
    }

    const handleLeave = (e) => {
        e.target.style.opacity = '1'
    }

  return (
        <GridItem 
            className='node grid-item' 
            id={props.id}
            onClick={handleClick}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            >
        </GridItem>)

}

export default Square