import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom'
import {useDispatch} from 'react-redux'


export default function Splash() {

  const dispatch = useDispatch()

  const history = useHistory()
  const [event, setEvent] = useState([])

  const enterZendo = (singleEvent) => {
    console.log('lone event in dispatch', singleEvent)
    dispatch({type: 'MEDITATION', payload:{
        id: singleEvent.id,
        hour: singleEvent.start_time_hour,
        minute: singleEvent.start_time_minute,
        duration: singleEvent.duration,
        koan: singleEvent.koan
    }})
    //button sends you into the zendo
    //it gets you to Stage0, where the timers begin
    history.push('/zendo')
  }

  //getEvents sends the current time to the server
  //it returns the nearest upcoming event to the splash page
  function getEvents() {
    const now = new Date();
    const serverChecker = ((now.getHours() * 3600000) + (now.getMinutes() * 60000))
    axios.get(`/session/portal/${serverChecker}`)
      .then((response) => {
        console.log(response.data)
        setEvent(response.data)
      }).catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    getEvents();
  }, [])


  return (
    <div className="App">
      <header className="App-header">
        <div className="splash-container">
          <h2>User Portal</h2>
          <h4>Other views from this page: list of all saved koans, full calendar view</h4>
          <table>
            <thead>
              <tr>
                <td>Start Time</td>
                <td>Duration</td>
                <td></td>
              </tr>
            </thead>
            <tbody>
              {(event.map((detail) => {
                return (
                  <tr key={detail.start_time_minute}>
                    <td>{detail.start_time_hour}:{detail.start_time_minute}</td>
                    <td>{detail.duration}</td>
                    <td><button onClick={()=>enterZendo(detail)}>Enter Zendo</button></td>
                  </tr>
                )
              }))}
            </tbody>
          </table>
          <div className="button-container">
            <button onClick={()=>console.log('nav to Koan view')}>View all Koans</button>
            <button onClick={()=>console.log('nav to Calendar view')}>View Calendar</button>
          </div>
        </div>
      </header>
    </div>
  );
}
