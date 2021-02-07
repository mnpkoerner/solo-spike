import React, { useEffect, useState } from 'react';
import Stage1 from '../Stage1/Stage1.jsx'
import Stage2 from '../Stage2/Stage2.jsx'
import Stage3 from '../Stage3/Stage3.jsx'

import end_2_bells from '../../end_2_bells'

import axios from 'axios';




export default function Stage0() {


  //components render in three stages
  //stage one is waiting room
  //stage two is Zendo (need post request to get current number sitting)
  const [timerStage, setTimerStage] = useState(1)
  const [attended, setAttended] = useState(0)
  const [koan, setKoan] = useState('')

  //gets specific session id and saves it for later



  //returns the current time in milliseconds
  function timeNowMillis() {
    const now = new Date();
    const hours = (now.getHours() * 3600000);
    const minutes = (now.getMinutes() * 60000);
    const seconds = (now.getSeconds() * 1000);
    const mseconds = now.getMilliseconds();
    const nowMS = (hours + minutes + seconds + mseconds)
    return nowMS;
  }

  //sets the moment in time on page load
  const thisMoment = timeNowMillis();

  //page loads, GETS most recent event in the DB (or maps event ID to button id?)
  //MAYBE
  //GET 1 WHERE DATE is closest to day and HOUR is closest to now
  const getData = () => {
    const now = new Date();
    const serverChecker = ((now.getHours() * 3600000) + (now.getMinutes() * 60000))
    axios.get(`/session/${serverChecker}`)
      .then((response) => {
        console.log('response from getData', response.data);
        const startTime = ((response.data[0].start_time_hour * 3600000) + response.data[0].start_time_minute * 60000);
        const delay = (startTime - thisMoment);
        console.log('time before meditation starts', delay)
        //it calls countDownToStart, passes in the delay time
        //countDownToStart runs a getDetails after the delay time
        //getDetails gets the duration of the event, the total people at the event
        const sessionInfo = {delay: delay, id: response.data[0].id}

        countdownToStart(delay)
      }).catch((error) => {
        console.log(error);
        alert('error getting')
      })
  }

  //after the delay time it:
  //calls a GET to get details/number of people sitting at the session
  function countdownToStart(delayTime) {
    console.log('in stage one');
    setTimeout(getDetails, delayTime)
  }

  //dispatches a GET for the duration and attendance
  //uses the response to call
  function getDetails() {
    console.log('in getDetails with session id')
    axios.get(`/session/sitting/`)
      .then((response) => {
        console.log('response from getting details (is undef?)', response.data);
        setAttended(response.data[0].attended)
        setKoan(response.data[0].koan)
        startSitting(response.data[0].duration * 60000)
      }).catch((error) => {
        console.log(error);
      })
  }
//startSitting takes the duration and uses it to run a duration timer
//startSitting changes the counter to stage 2, and it renders the meditation view component
//it calls endSitting after the timer runs, which renders the third component
  function startSitting(meditationLength) {
    setTimerStage(2)
    console.log('in stage two duration', meditationLength)
    setTimeout(endSitting, meditationLength)
  }

  //calls last component after session is done
  //says thank you, shows koan
  function endSitting() {
    setTimerStage(3)
    console.log('end of session')
  }



  //the switch statement listens for the change in timer stage and renders a component
  function componentSwitch(condition) {
    switch (condition) {
      case 1:
        return (<Stage1 />);
      case 2:
        return (<Stage2
          attended={attended}/>);
      case 3:
        return (<Stage3 koan={koan}/>);
        defeault:
        break;
    }
  }


  useEffect(() => {
    getData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <p>WORKING</p>
        <p>{timerStage}</p>
        {componentSwitch(timerStage)}
      </header>
    </div>
  );
}
