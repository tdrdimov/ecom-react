import React from 'react';
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import SignIn from '../../components/sign-in/sign-in.component';
import SignUp from '../../components/sign-up/sign-up.component';

import './sign-in-and-sign-up.styles.scss';

const SignInAndSignUpPage = () => (
  <Container className='sign-in-and-sign-up'>
    <Row>
      <Col>
        <SignIn />
      </Col>
      <Col>
        <SignUp />
      </Col>
    </Row>
  </Container>
);

export default SignInAndSignUpPage;
