import React from 'react'
import { numbersUpTo } from './utils/utilityFunctions'

const Coordinates = ({ vertical }) => {

    const labels = numbersUpTo(16)
    return(
        <div>
            {labels.map((element, index) => {
                return(
                    <div> {element} </div>
                )
            })}
        </div>
    )
}