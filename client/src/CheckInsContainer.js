import { useNavigate } from "react-router-dom";
import { Container, Row, Button } from "react-bootstrap";
import CheckInCard from "./Components/CheckInCard";
import { useState } from 'react';

const CheckInsContainer = ({ dateWithoutTime, currentUser, deleteCheckIn }) => {

  const [showCheckIns, setShowCheckins] = useState(false)
  let navigate = useNavigate()

  const renderCheckIns = currentUser.check_ins.sort(function(a,b){
    return new Date(b.date) - new Date(a.date);
  }).map(checkIn => <CheckInCard 
    key={checkIn.id} 
    checkInInfo={checkIn} 
    deleteCheckIn={deleteCheckIn}
    dateWithoutTime={dateWithoutTime} 
  />)

  return (
    <Container className='pt-2'>
      <Row>
        <h3>Check Ins</h3>
      </Row>
      <Row className="d-flex justify-content-around">
        {currentUser.check_ins.length > 0 ? 
          <Button 
            className="w-50 m-2" 
            variant="warning" 
            onClick={() => setShowCheckins(!showCheckIns)}
          >
            {showCheckIns ? "Hide Check Ins" : "Show Check Ins" }
          </Button> : null
        }
      </Row>
      <Row>
        {showCheckIns ? renderCheckIns : null }
      </Row>
      <Row className="d-flex justify-content-around">
        <Button 
          className="w-50 m-2" 
          variant="warning" 
          onClick={() => navigate("/check-ins/new")}
        >
          Create a Check In
        </Button>
      </Row>
    </Container>
  )
}

export default CheckInsContainer;