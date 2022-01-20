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
  const [selectedGoal, setSelectedGoal] = useState(null)
    
  let navigate = useNavigate()

  const selectGoal = (goal) => setSelectedGoal(goal)
  
  useEffect(() => {
    fetch("/me").then((r) => {
      if (r.ok) {
        r.json().then((user) => {
          setCurrentUser(user)
          setSelectedGoal(user.goals[user.goals.length -1]
        )
        });
      }
    });
  }, []);
  console.log(currentUser)
  console.log(selectedGoal)

  if (!currentUser) return <LogIn setCurrentUser={setCurrentUser} />;

  const updateUserInfo = (updatedUserInfo) => {
    setCurrentUser(updatedUserInfo)
    const updatedGoalInfo = updatedUserInfo.goals.find( goal => goal.id === selectedGoal.id)
    setSelectedGoal(updatedGoalInfo)
    navigate('/')
  }

  const deleteGoal = (deletedGoal) => {
    const updatedUserInfo = {...currentUser}
    updatedUserInfo.goals = currentUser.goals.filter(goal => goal.id !== deletedGoal.id)
    setCurrentUser(updatedUserInfo)
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
              selectedGoal={selectedGoal}
              selectGoal={selectGoal}
            />
          } 
        />
          <Route
            path='/check-ins/new'
            element={
              <CheckInForm updateUserInfo={updateUserInfo} />
            } 
          />
          <Route
            path='/check-ins/:checkInId/edit'
            element={
              <CheckInForm updateUserInfo={updateUserInfo} />
            } 
          />
          <Route
            path='/goals/:goalId/edit'
            element={
              <GoalForm 
                currentUser={currentUser} 
                updateUserInfo={updateUserInfo} 
              />
            }
          />
          <Route
            path='/goals/new'
            element={
              <GoalForm 
                currentUser={currentUser} 
                updateUserInfo={updateUserInfo}
              />
            } 
          />
      </Routes>
    </div>
  );
}

export default App;
