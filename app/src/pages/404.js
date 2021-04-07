import React from "react";
import { Link } from "gatsby";

import { Container } from "react-bootstrap";

const NotFound = () => {
  return (
  	<div>
    <Container>
          <h1>Page not found</h1>
      <p>
        <Link to="/">Head home</Link>
      </p>
    </Container>
    </div>
  )
}

export default NotFound;