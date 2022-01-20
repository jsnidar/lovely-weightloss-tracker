import { Container} from 'react-bootstrap';
import {
  Chart as ChartJS,
  registerables,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import 'chartjs-adapter-date-fns';
import {enGB} from 'date-fns/locale';

ChartJS.register(...registerables);

const GoalChart = ({dateWithoutTime, selectedGoal, currentUser}) => {
  
  const startDate = dateWithoutTime(selectedGoal.goal_start_date)

  const endDate = dateWithoutTime(selectedGoal.goal_end_date)
  
  let goalCheckIns = selectedGoal.goal_check_ins.map(checkIn => {
    return {x: checkIn.date, y: checkIn.weight}
  })
  
  goalCheckIns = goalCheckIns.sort(function(a,b){
    return new Date(a.x.valueOf()) - new Date(b.x.valueOf());
  })

  let currentWeight = goalCheckIns.length > 0 ? goalCheckIns[0].y : currentUser.check_ins.sort(function(a,b){
    return dateWithoutTime(a.date).valueOf() - dateWithoutTime(b.date).valueOf();
  })[currentUser.check_ins.length -1].weight

  const options = {
    animation: false,
    spanGaps: true,
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Weight in lbs"
        }
      },
      x: {
        adapters: {
          date: {
              locale: enGB
          }
      },
        type: "time",
        distribution: "linear",
        time: {
          parser: "yyyy-MM-dd",
          unit: "month"
        },
        title: {
          display: true,
          text: "Date"
        }
      }
    },
    plugins: {
      legend: {position: 'top'},
      title: {
        display: true,
        text: selectedGoal.goal_name,
      },
    },
  };

  const data = {
    datasets: [
      {
        label: 'Check-Ins',
        data: goalCheckIns,
        borderColor: 'rgb(53, 162, 235)',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        showLine: true
      },
      {
        label: 'Goal',
        data: [{x: startDate, y: currentWeight}, {x: endDate, y:selectedGoal.goal_weight}],
        borderColor: '#FFCE0E',
        backgroundColor: '#FFCE0E',
        borderDash: [3]
      }
    ],
  };

  return(
    selectedGoal ? <Container className='border'>
      <Line
        options={options}
        data={data}
        style={{vh:50}}
        datasetIdKey="id"
      />
    </Container> : null
  )
}

export default GoalChart; 