import './App.css';
import NavBar from './NavBar';
import Home from './Home';
import LogIn from './LogIn';
import CheckInForm from './CheckInForm';
import GoalForm from './GoalForm';
import { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom"

function App() {

  const [currentUser, setCurrentUser] = useState(null)
  let navigate = useNavigate()

  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => setCurrentUser(user));
      }
    });
  }, []);
  console.log(currentUser)
  if (!currentUser) return <LogIn setCurrentUser={setCurrentUser} />;

  const updateGoals = (goal, goalId) => {
    const updatedUserInfo = {...currentUser}
    goalId ? updatedUserInfo.goals = updatedUserInfo.goals.map(priorGoal => {
      if (parseInt(priorGoal.id) === parseInt(goalId, 10)) {
          return goal 
      }else{
          return priorGoal
      }}) : updatedUserInfo.goals.push(goal)
    setCurrentUser(updatedUserInfo)
    navigate('/')
  }

  const deleteGoal = (deletedGoal) => {
    const updatedUserInfo = {...currentUser}
    updatedUserInfo.goals = currentUser.goals.filter(goal => goal.id !== deletedGoal.id)
    setCurrentUser(updatedUserInfo)
  }

  const updateCheckIns = (checkIn, checkInId) => {
    const updatedUserInfo = {...currentUser}
    checkInId ? updatedUserInfo.check_ins = updatedUserInfo.check_ins.map(check_in => {
      if (check_in.id === parseInt(checkInId)) {
          return checkIn 
      }else{
          return check_in
      }}) : updatedUserInfo.check_ins.push(checkIn)
    setCurrentUser(updatedUserInfo)
    navigate('/')
  }
    
  const deleteCheckIn = (deletedCheckIn) => {
    const updatedUserInfo = {...currentUser}
    updatedUserInfo.check_ins = currentUser.check_ins.filter(checkIn => checkIn.id !== deletedCheckIn.id)
    setCurrentUser(updatedUserInfo)
  }

  const year = (date) => date.slice(0,4)
  const month = (date) => parseInt(date.slice(5,7)) - 1
  const day = (date) => date.slice(8,10)

  const dateWithoutTime = (givenDate) => new Date(
    year(givenDate),
    month(givenDate),
    day(givenDate)
  );

  return (
    <div>
      <NavBar 
        currentUser={currentUser} 
        setCurrentUser={setCurrentUser} 
      />
      <Routes>
        <Route 
          path='/' 
          element={
            <Home 
              deleteCheckIn={deleteCheckIn}
              deleteGoal={deleteGoal}
              currentUser={currentUser}
              dateWithoutTime={dateWithoutTime} 
            />
          } 
        />
          <Route
            path='/check-ins/new'
            element={
              <CheckInForm updateCheckIns={updateCheckIns} />
            } 
          />
          <Route
            path='/check-ins/:checkInId/edit'
            element={
              <CheckInForm updateCheckIns={updateCheckIns} />
            } 
          />
          <Route
            path='/goals/:goalId/edit'
            element={
              <GoalForm 
                currentUser={currentUser} 
                updateGoals={updateGoals} 
              />
            }
          />
          <Route
            path='/goals/new'
            element={
              <GoalForm 
                currentUser={currentUser} 
                updateGoals={updateGoals}
              />
            } 
          />
      </Routes>
    </div>
  );
}

export default App;
