import styled from 'styled-components'


const Square = styled.button`
    border: 0.1px solid #000000;
    text-align: center;
    height: 20px;
    width: 20px;
    margin: auto;
    ${props => `background: ${props.background};`}
    `
const Data = styled.td`
    vertical-align: middle !important;
    text-align: center;
    
`

const TableRow = styled.tr``

const Head = styled.th`
    text-align: center
`

const TableHead = styled.thead``

const TableBody = styled.tbody``


export { TableHead, TableBody, Head, TableRow, Data, Square }