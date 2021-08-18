import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchEvents } from "../../store/eventReducer";
import Card from '../EventsCard'


export default function EventsPage () {
    const dispatch = useDispatch()
    
    const events = useSelector((state) => Object.values(state.event.allEvents))

    useEffect( () => {
        dispatch(fetchEvents())
    }, [dispatch])
    
    return (
        <div className="groups-page-container">
            { events.map(event => {
                return <Card event={event} key={event.id}></Card>
            })}
        </div>
    )
}