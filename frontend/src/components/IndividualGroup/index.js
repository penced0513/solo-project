// import { NavLink } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom"

import { fetchGroups } from "../../store/groupReducer";
import EditGroupForm from '../EditGroupForm'
import { deleteGroup, getUserGroups, joinGroup, leaveGroup } from "../../store/groupReducer";
import './individualGroup.css'

const IndividualGroup = () => {
    const history = useHistory()
    const dispatch = useDispatch()
    const sessionUser = useSelector(state => state.session.user);
    const sessionGroups = useSelector(state => state.group.joined)
    const {groupId} = useParams()
    const group = useSelector(state => state.group.allGroups[groupId])
    const [showEditGroupForm, setShowEditGroupForm] = useState(false)
    const [showDelete, setShowDelete] = useState(false)
    const [inGroup, setInGroup] = useState('')

    useEffect( () => {
        dispatch(fetchGroups()).then( () =>{
            if (sessionUser){
                dispatch(getUserGroups(sessionUser)).then( () => {
                    if (sessionGroups[groupId]) {
                        setInGroup(true)
                    } else {
                        setInGroup(false)
                    }
                }) 
            }
        })
    },[dispatch, sessionUser, groupId, sessionGroups.userGroups, sessionGroups])

    let content = null

    const handleDelete = async() => {
        await dispatch(deleteGroup(groupId))
        history.push('/groups')
    }
    const confirmDelete = <button onClick={handleDelete}>Yes</button>
    const cancelDelete = <button onClick={() => setShowDelete(false)}>Cancel</button>

    const joinGroupButton = async() => {
        await dispatch(joinGroup(sessionUser.id, groupId))
        setInGroup(true)
    }

    const leaveGroupButton = async() => {
        await dispatch(leaveGroup(sessionUser.id, groupId))
        setInGroup(false)
    }

    if (showEditGroupForm){
        content = (
            <EditGroupForm group={group} hideForm={() => setShowEditGroupForm(false)}/>
        )
    } else {
        content = (
            <div className="group-page-container">
                <div className="group-info-container">
                    <div>
                        <img className="group-img" src={group?.img} alt="group"></img>
                    </div>
                    <div className="group-info-right-side">
                        <div className="group-name-location">
                            <h1>{group?.name}</h1>
                            <h3>{group?.location}</h3>
                        </div>
                        <div className="user-join-leave-btn-container">
                            {!inGroup && <button className="join-leave-group" onClick={() => joinGroupButton()}>Join Group</button>}
                            {inGroup && <button className="join-leave-group" onClick={() => leaveGroupButton()}>Leave Group</button>}
                            {sessionUser?.id === group?.organizer &&
                            <div>
                            <button onClick={() => setShowEditGroupForm(true)}>Edit Group</button>
                            <button onClick={() => setShowDelete(true) }>Delete Group</button>
                            {showDelete && <div><div>Are you sure you want to delete this group?</div>{confirmDelete}{cancelDelete}</div>}
                            </div>}
                        </div>
                    </div>
                </div>
                <div className="group-page-description">
                    <h2>What we're about</h2>
                    <p>{group?.description}</p>
                </div>
                <div>Todo... add events on this page</div>


            </div>
        )
    }

    return (
        <div>
            {content}
        </div>
    )

}

export default IndividualGroup
