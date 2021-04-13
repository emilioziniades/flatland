import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import HeaderBase from '../components/Header/headerBase'



const ExplainerPage = ({ data, }) => {

  console.log(data)
  const { allMarkdownRemark } = data
  console.log(allMarkdownRemark)
  const { nodes } = allMarkdownRemark
  const explainer = nodes[0]
  const {frontmatter, html} = explainer


    return (
        <div>
            <HeaderBase />
            <Container >
                <Row className='justify-content-center p-3'>
                <h1>{frontmatter.title}</h1>  
                </Row>
                <Row className='justify-content-left p-3'>
                <div
                className="blog-post-content"
                dangerouslySetInnerHTML={{ __html: html }}
                />
                </Row>
            </ Container>
        </div>
    )
}

export default ExplainerPage

export const pageQuery = graphql`
query MyQuery {
  allMarkdownRemark {
    nodes {
      html
      frontmatter {
        title
      }
    }
  }
}
`