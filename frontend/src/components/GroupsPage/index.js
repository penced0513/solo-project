import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGroups } from "../../store/groupReducer";
import GroupCard from '../GroupsAndEventsCard'
import './groupsPage.css';

export default function GroupsPage () {
    const dispatch = useDispatch()
    
    const groups = useSelector((state) => Object.values(state.group.allGroups))

    useEffect( () => {
        dispatch(fetchGroups())
    }, [dispatch])
    return (
        <div className="groups-page-container">
            { groups.map(group => {
                return <GroupCard group={group} key={group.id}></GroupCard>
            })}
        </div>
    )
}
