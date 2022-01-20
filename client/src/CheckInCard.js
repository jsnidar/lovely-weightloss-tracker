
import { useNavigate } from "react-router-dom"
import { Card, Row, Col, Button } from "react-bootstrap"

const CheckInCard = ({ dateWithoutTime, checkInInfo, deleteCheckIn }) => {

  let navigate = useNavigate();

  const formattedDate = (givenDate) => dateWithoutTime(givenDate).toDateString();


  const handleDeleteCheckIn = () => {
    fetch(`/check_ins/${checkInInfo.id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(() => deleteCheckIn(checkInInfo));
      }
    })
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Date: {formattedDate(checkInInfo.date)}</Card.Title>
        <Row>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Weight</Card.Subtitle>
            <Card.Text>{checkInInfo.weight} lbs.</Card.Text>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Measurements</Card.Subtitle>
            {checkInInfo.left_arm_measurement ? 
              <Card.Text>
                Left Arm: {checkInInfo.left_arm_measurement} in.
              </Card.Text> : null
            }
            {checkInInfo.left_thigh_measurement ? 
              <Card.Text>
                Left Thigh: {checkInInfo.left_thigh_measurement} in.
              </Card.Text> : null
            }
            {checkInInfo.waist ? 
              <Card.Text>
                Waist: {checkInInfo.waist} in.
              </Card.Text> : null
            }
            {checkInInfo.hips ? 
              <Card.Text>
                Hips: {checkInInfo.hips} in.
              </Card.Text> : null
            }
            {checkInInfo.chest ? 
              <Card.Text>
                Chest: {checkInInfo.chest} in.
              </Card.Text> : null
            }
            <Card.Text>Notes: {checkInInfo.notes}</Card.Text>
          </Col>
        </Row>
        <Button 
          variant='warning' 
          onClick={() => handleDeleteCheckIn()}
        >Delete</Button>
        <Button 
          variant='warning' 
          onClick={() => navigate(`/check-ins/${checkInInfo.id}/edit`)}
        >Edit</Button>
      </Card.Body>
    </Card>
  )
}

export default CheckInCard;