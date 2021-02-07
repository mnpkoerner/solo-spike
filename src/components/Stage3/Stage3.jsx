import {useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'

export default function Stage3 () {

    const history = useHistory()

    const handleClick = () =>{
        console.log('leave room')
        //update DB that user has left?
        history.push('/')
    }


    const sessionInfo = useSelector(store=>store.meditationReducer)
    return(
        <>
        <p>Thank You for sitting, here's your koan:</p>
        <p>{sessionInfo.koan}</p>
        <button onClick={()=>{handleClick()}}>Back to User Portal</button>
        </>

    )
}
