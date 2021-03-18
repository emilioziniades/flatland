import React from 'react';

import styled from "styled-components"

const Grid = styled.div`
    display: grid;
    grid-gap: 0em;
    grid-template-rows: repeat(16, 1fr);
    grid-template-columns: repeat(16, 1fr);
    height: 256px;
    width: 256px;
    `
const Node = styled.div`
    padding: 0em;
    border: 0.1px solid #000000;
    text-align: center;
    height: 16px;
    width: 16px;
`

const Square = (props) => {
  return <Node className="node" id={props.id}></Node>;
};

const gridLength = 256
let counter = 1
export default function Canvas(){
    const grid = [];
    for (let row = 0; row < gridLength; row++) {
        grid.push(counter);
        counter++;
    }

  return (<Grid className="mx-auto"> 
    {grid.map((node, nodeId) => {
      return (
              <Square key={nodeId} id={"node-".concat(nodeId + 1)}> {node} </Square>
            )
          })}
        </Grid>) }