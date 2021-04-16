import React, { useState } from 'react'
import Node from './node'

const Square = (props) => {

    const [clicked, setClicked] = useState(false)

    const handleClick = (e) => {

        console.log(e)

        if (clicked) {
            setClicked(false)
            e.target.style.border = 'none'
        }
        else {
            setClicked(true)
            e.target.style.border = '1px solid black'
        }
    }

  return <Node 
            className='node' 
            id={props.id}
            onClick={handleClick}
            >
            
            </Node>;
}

export default Square