import styled from 'styled-components'

const GridItem = styled.button`
    padding: 0em;
    border: none;
    background: ${props => props.colour};
    border: ${props => 
        props.highlight ? '2px solid' + props.inverseColour 
        :        
        props.selected ? '2px solid' + props.inverseColour
        : 'none'};
    text-align: center;
    height: 16px;
    width: 16px;
`
export default GridItem