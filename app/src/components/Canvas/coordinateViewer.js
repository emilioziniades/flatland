import React, { useContext } from 'react'
import { CoordinateContext } from '../canvasContextProvider'


const CoordinateViewer = () => {
    
    const { currentCoord } = useContext(CoordinateContext)
    return (
        <h6> { currentCoord } </h6>
    )
}

export default CoordinateViewer