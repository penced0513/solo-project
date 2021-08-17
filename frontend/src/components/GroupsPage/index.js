import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchGroups } from "../../store/groupReducer";
import GroupCard from '../GroupsAndEventsCard'

export default function GroupsPage () {
    const dispatch = useDispatch()
    
    const groups = useSelector((state) => Object.values(state.group))

    useEffect( () => {
        dispatch(fetchGroups())
    }, [dispatch])
    return (
        <div>
            <div>
                <div>Groups (navlink to groups)</div>
                <div>Events (navlink to events)</div>
            </div>
            {groups.map(group => {
                return <GroupCard group={group} key={group.id}></GroupCard>}
            )}
        </div>
    )
}