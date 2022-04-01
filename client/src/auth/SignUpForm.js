import React, { useState } from 'react';
import { Button, Form, Container, Row, Col } from 'react-bootstrap';
import ErrorAlert from '../errors/ErrorAlert';
import { useNavigate } from 'react-router-dom';

const SignUpForm = ({ setCurrentUser }) => {

  const [errors, setErrors] = useState(null)
  const [formData, setFormData ] = useState({
    first_name: '', 
    last_name: '',
    height_feet: 0,
    height_inches: 0,
    email: '',
    email_confirmation: '',
    password: '',
    password_confirmation: '',
    username: ''
  })
  let navigate = useNavigate()

  const handleSignUpSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    const user = {
      name: `${formData.first_name} ${formData.last_name}`,
      height: parseInt(formData.height_feet * 12) + parseInt(formData.height_inches),
      email: formData.email,
      email_confirmation: formData.email_confirmation,
      password: formData.password,
      password_confirmation: formData.password_confirmation,
      username: formData.username
    }
    fetch('/signup', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(user)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(user => setCurrentUser(user))
        .then(navigate('/'))
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  return (
    <div>
      <Container>
        <br></br>
        <Form>
          <Row>
            <h1>Sign Up</h1>
            { errors ? <ErrorAlert errors={errors.errors} /> : null }
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="firstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder=""
                  value={formData.first_name}
                  onChange={e => setFormData({...formData, first_name: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="lastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder=""
                  value={formData.last_name}
                  onChange={e => setFormData({...formData, last_name: e.target.value})}
                />
              </Form.Group>
            </Col>
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
          </Row>
            <Form.Label>Height</Form.Label>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="heightFeet">
                <Form.Label>Feet</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Enter feet"
                  value={formData.height_feet}
                  onChange={e => setFormData({...formData, height_feet: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="heightInches">
                <Form.Label>Inches</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Enter inches"
                  value={formData.height_inches}
                  onChange={e => setFormData({...formData, height_inches: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Enter Email Address</Form.Label>
                  <Form.Control 
                    type="email" 
                    placeholder="name@example.com" 
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="emailConfirmation">
                <Form.Label>Confirm Email Address</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="name@example.com" 
                  value={formData.email_confirmation}
                  onChange={e => setFormData({...formData, email_confirmation: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Create Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Create a password" 
                  value={formData.password}
                  onChange={e => setFormData({...formData, password: e.target.value})}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="passwordConfirmation">
                <Form.Label>Confirm Password</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Confirm your password" 
                  value={formData.password_confirmation}
                  onChange={e => setFormData({...formData, password_confirmation: e.target.value})}
                />
              </Form.Group>
            </Col>
          </Row>
          <Button 
            variant="warning" 
            type="submit"
            onClick={e => handleSignUpSubmit(e)}
          >
            Submit
          </Button>
        </Form> 
      </Container>
    </div>
  );
}

export default SignUpForm;