//need useHistory to go back one page
import {useHistory} from 'react-router-dom'


import {useSelector} from 'react-redux'

export default function Stage1 () {

    const sessionInfo = useSelector(store=>store.meditationReducer)

    const history = useHistory()
    const backToSplash = () => {
        console.log('GET OUT')
        history.push('/')
    }
    return(
        <>
        <p>Waiting for your {sessionInfo.duration} minute session to begin at {sessionInfo.hour}:{sessionInfo.minute}</p>
        <p>We'll see some nice and encouraging things in this view</p>
        <p>We're waiting until the meditation starts</p>
        <button onClick={()=>backToSplash()}>Back to User Portal</button>
        </>
    )
}
