import {useHistory} from 'react-router-dom'

//need axios and use effect, axios to get total sitting
//use effect to call the get on page load?
//otherwise call the get on another timer, send results to reducer five seconds
//before this page loads, and and hold them there so this page can call them

//lets get a reducer too

export default function Stage2 ({attended}) {

    //for the button
    const history = useHistory()

    const handleClick = () =>{
        console.log('leave room')
        //update DB that user has left?
        history.push('/')
    }


    return(
        <>
        <p>You're meditating</p>
        <p>People sitting with you: {attended}</p>
        <button onClick={()=>{handleClick()}}>Back to User Portal</button>
        </>

    )
}
