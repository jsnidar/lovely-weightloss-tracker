
import { useNavigate } from "react-router-dom"
import { Card, Row, Col, Button } from "react-bootstrap"

const GoalCard = ({ 
  goalInfo, 
  deleteGoal, 
  checkIns, 
  selectGoal,
  dateWithoutTime
}) => {

  let navigate = useNavigate();

  const formattedDate = (givenDate) => dateWithoutTime(givenDate).toDateString();

  const metGoal = checkIns.length > 0 ? 
    checkIns[checkIns.length -1].weight <= goalInfo.goal_weight : 
    false


  const lbsToLose = checkIns.length > 0 ? checkIns[checkIns.length -1].weight - goalInfo.goal_weight : ""
  const startDate = goalInfo.goal_start_date
  const endDate = goalInfo.goal_end_date
  const lastCheckin =  checkIns.length > 0 ? checkIns[checkIns.length -1] : ''

  const handleDeleteGoal = () => {
    fetch(`/goals/${goalInfo.id}`, {
      method: "DELETE"
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(() => deleteGoal(goalInfo));
      }
    })
  }

  return (
    <Card>
      <Card.Body>
        <Card.Title>Name: {goalInfo.goal_name}</Card.Title>
        <Row>
          <Card.Subtitle className="mb-2 text-muted">Date Range: </Card.Subtitle>
          <Card.Text>
            {formattedDate(startDate)} to {formattedDate(endDate)}
          </Card.Text>
          <br></br>
        </Row>
        <Row>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Starting weight: </Card.Subtitle>
            <Card.Text>
              {
                checkIns.length > 0 ? 
                checkIns[0].weight + " lbs" : 
                null
              } 
            </Card.Text>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Goal weight: </Card.Subtitle>
            <Card.Text>
              {goalInfo.goal_weight} lbs.
            </Card.Text>
          </Col>
          <Col>
            <Card.Subtitle className="mb-2 text-muted">Final Weight: </Card.Subtitle>
            <Card.Text>
              {checkIns.length > 0 ? lastCheckin.weight + " lbs" : null}
            </Card.Text>
          </Col>
        </Row>
        <Row>
          {<Card.Text>{
            checkIns.length > 0 ? 
              metGoal ? 
                "Congratulations you met your goal!" : 
                `Only ${lbsToLose} lbs. to go!` : 
            null
          }
          </Card.Text>}
        </Row>
        <Button 
          variant='warning' 
          onClick={() => handleDeleteGoal()}
        >Delete</Button>
        <Button 
          variant='warning' 
          onClick={() => navigate(`/goals/${goalInfo.id}/edit`)}
        >Edit</Button>
        <Button 
          variant='warning' 
          onClick={() => selectGoal(goalInfo)}
        >View in Chart</Button>
      </Card.Body>
    </Card>
  )
}

export default GoalCard;