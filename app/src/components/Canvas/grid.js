import React from 'react'
import styled from 'styled-components'

const Grid = styled.div`
    display: grid;
    grid-gap: 0em;
    grid-template-rows: repeat(16, 1fr);
    grid-template-columns: repeat(16, 1fr);
    border: 2px solid #000000;
    `

export default Grid