
import { Form, Container, Row, Col, Button } from 'react-bootstrap';
import { useEffect, useState } from 'react';
import ErrorAlert from './ErrorAlert';
import { useNavigate, useParams } from 'react-router-dom';

const CheckInForm = ({updateUserInfo}) => {

  let { checkInId } = useParams()
  let navigate = useNavigate()

  const [errors, setErrors] = useState(null)
  const [formData, setFormData] = useState({
    date: "",
    weight: "",
    left_arm_measurement: "",
    left_thigh_measurement: "",
    waist: "",
    chest: "",
    hips: "",
    notes: "",
    id: null
  })

  useEffect(() => {
    if(checkInId) {
      fetch(`/check_ins/${checkInId}`)
      .then(r => r.json())
      .then(checkIn => {
        const formattedCheckIn = {
          date: "",
          weight: "",
          left_arm_measurement: "",
          left_thigh_measurement: "",
          waist: "",
          chest: "",
          hips: "",
          notes: "",
          id: null
        }
        for(const key in checkIn) {
          if(checkIn[key] !== null) {
            formattedCheckIn[key] = checkIn[key]
          }
        }
        setFormData(formattedCheckIn)
      })
    }
  }, [checkInId])

  const measurementDropDownValues = []
  let i = 0
  while( i < 85 ) {
    measurementDropDownValues.push(i)
    i = i + 0.25
  }

  const renderMeasurements = measurementDropDownValues.map(value => <option key={value} value={value}>{value}</option>)
  
  const editCheckIn = () => {
    fetch(`/check_ins/${checkInId}`, {
      method: "PATCH",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((user) => updateUserInfo(user));
          }
        }))
        .then(navigate('/'));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  const createCheckIn = () => {
    fetch('/check_ins', {
      method: "POST",
      headers: {'Content-Type':'application/json'},
      body:JSON.stringify(formData)
    })
    .then(res => {
      if(res.ok){
        res.json()
        .then(fetch("/me").then((r) => {
          if (r.ok) {
            r.json().then((user) => updateUserInfo(user));
          }
        }))
        .then(navigate('/'));
      }else{
        res.json().then(e => setErrors(e))
      }
    })
  }

  const handleCheckInSubmit = (e) => {
    e.preventDefault()
    setErrors(null)
    checkInId ? editCheckIn() : createCheckIn()
  }

  return (
    <Container>
      <br></br>
      <Form>
        <Row>
          { checkInId ? <h1>Edit Check In</h1> : <h1>Create a New Check In</h1> }
          { errors ? <ErrorAlert errors={errors.errors} /> : null }
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="date">
            <Form.Label>Date</Form.Label>
            <Form.Control 
              type="date" 
              placeholder="Enter measurement in inches" 
              value={formData.date}
              onChange={e => setFormData({...formData, date: e.target.value})}
            />
          </Form.Group>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="weight">
              <Form.Label>Weight (lbs)</Form.Label>
              <Form.Control 
                type="number" 
                placeholder="Enter weight (lbs)"
                value={formData.weight}
                onChange={e => setFormData(
                  {...formData, weight: parseInt(e.target.value)}
                )}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="left_arm_measurement">
              <Form.Label>Left Arm (in) </Form.Label>
              <Form.Select 
                value={formData.left_arm_measurement}
                onChange={e => setFormData(
                  {...formData, left_arm_measurement: parseFloat(e.target.value)}
                )}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="left_thigh_measurement">
              <Form.Label>Left Thigh (in)</Form.Label>
              <Form.Select 
                value={formData.left_thigh_measurement}
                onChange={e => setFormData(
                  {...formData, left_thigh_measurement: parseFloat(e.target.value)}
                )}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group className="mb-3" controlId="waist">
              <Form.Label>Waist (in)</Form.Label>
              <Form.Select 
                value={formData.waist}
                onChange={e => setFormData(
                  {...formData, waist: parseFloat(e.target.value)}
                )}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="hips">
              <Form.Label>Hips (in)</Form.Label>
              <Form.Select 
                value={formData.hips}
                onChange={e => setFormData(
                  {...formData, hips: parseFloat(e.target.value)}
                )}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3" controlId="chest">
              <Form.Label>Chest (in)</Form.Label>
              <Form.Select 
                value={formData.chest}
                onChange={e => setFormData(
                  {...formData, chest: parseFloat(e.target.value)}
                )}
                aria-label="Select a measurement"
              >
                <option>Select a measurement</option>
                {renderMeasurements}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Form.Group className="mb-3" controlId="notes">
            <Form.Label>Notes</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter notes here" 
              value={formData.notes}
              onChange={e => setFormData(
                {...formData, notes: e.target.value}
              )}
            />
          </Form.Group>
        </Row>
        <Row className="d-flex justify-content-around">
          <Button 
            className="w-50 m-2"
            variant="warning" 
            type="submit"
            onClick={e => handleCheckInSubmit(e)}
          >Submit</Button>
          <Button 
            className="w-50 m-2"
            variant="warning" 
            onClick={e => navigate('/')}
          >Cancel</Button>
        </Row>
      </Form> 
    </Container>
  )
}

export default CheckInForm