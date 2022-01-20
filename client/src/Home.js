import { Container, Row, Image } from 'react-bootstrap';
import GoalsContainer from "./GoalsContainer";
import CheckInsContainer from './CheckInsContainer';

const Home = ({ selectGoal, dateWithoutTime, currentUser, deleteCheckIn, deleteGoal, selectedGoal}) => {

  return (
    <Container className='p-2'>
      <Row className='p-2'>
        <Image src="/lovely_logo.png" />
        <h1>Weight Loss Tracker</h1>
      </Row>
      {currentUser.check_ins.length > 0 && selectedGoal ? <GoalsContainer 
        dateWithoutTime={dateWithoutTime}
        currentUser={currentUser} 
        deleteGoal={deleteGoal} 
        selectedGoal={selectedGoal}
        selectGoal={selectGoal}
      /> : null }
      <CheckInsContainer 
        dateWithoutTime={dateWithoutTime}
        currentUser={currentUser}
        deleteCheckIn={deleteCheckIn}
      />
    </Container>
  );
}

export default Home;