import React from 'react'
import { graphql } from 'gatsby'
import { Container, Row } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

import Header from '../components/Header/header'



const ExplainerPage = ({ data, }) => {

  console.log(data)
  const { allMarkdownRemark } = data
  console.log(allMarkdownRemark)
  const { nodes } = allMarkdownRemark
  const explainer = nodes[0]
  const {frontmatter, html} = explainer


    return (
        <>
          <Header />
          <Container >
              <Row className='justify-content-center p-3'>
              <h1 className='m-2'>{frontmatter.title}</h1>  
              </Row>
              <Row className='justify-content-left p-3'>
              <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
              />
              </Row>
          </ Container>
        </>
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