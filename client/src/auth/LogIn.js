
import { Container, Button, Image } from 'react-bootstrap';
import { useState } from 'react';
import SignInForm from './SignInForm';
import SignUpForm from './SignUpForm';

const LogIn = ({ setCurrentUser }) => {

  const [showSignIn, setShowSignIn] = useState(true)

  return (
    <>
      <Container>
        <Image src="lovely_logo.png" fluid />

        { showSignIn ? (<>
          <SignInForm setCurrentUser={setCurrentUser} />
          <br></br>
          <p>
            Don't have an account? <Button 
              variant='link' 
              onClick={() => setShowSignIn(false)}
            >   
              Sign Up Now
            </Button>
          </p>
        </>) : (
          <>
            <SignUpForm setCurrentUser={setCurrentUser} />
            <br></br>
            <p>
              Already have an account? <Button 
                variant='link' 
                onClick={() => setShowSignIn(true)}
              >   
                Sign In Now
              </Button>
            </p>
          </>
        )}
      </Container>
    </>
  )
}

export default LogIn;