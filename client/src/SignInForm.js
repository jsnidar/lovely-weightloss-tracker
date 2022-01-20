import React, { useState } from 'react';
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorAlert from './ErrorAlert';

const SignInForm = ({ setCurrentUser }) => {

  let navigate = useNavigate()
  const [errors, setErrors] = useState(null)
  const [formData, setFormData ] = useState({
    password: '',
    username: ''
  })

  const handleSignInSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    fetch('/login', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(user => setCurrentUser(user))
        .then(navigate('/'));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  return (
    <Container>
      <br></br>
      <Form>
        <Row>
          <h1>Sign In</h1>
          { errors ? <ErrorAlert errors={errors.errors} /> : null }
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              <Form.Control 
                type="text" 
                placeholder=""
                value={formData.username}
                onChange={e => setFormData({...formData, username: e.target.value})}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Create a password" 
              value={formData.password}
              onChange={e => setFormData({...formData, password: e.target.value})}
            />
          </Form.Group>
          </Col>
        </Row>
        <Button 
          variant="warning" 
          type="submit"
          onClick={e => handleSignInSubmit(e)}
        >
          Submit
        </Button>
      </Form> 
    </Container>
  );
}

export default SignInForm;