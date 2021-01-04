import React,{useReducer} from 'react'
import PersonContext from './PersonContext'
import PersonReducer from './PersonReducer'
import axios from 'axios'
import {GET_ALL_PERSONS,PERSIST_CHOSEN_PERSON,
        PERSIST_GROUP,DELETE_CHOSEN_PERSON,
        PERSIST_CHOSEN_PERSON_GROUPS,
        PERSIST_CHOSEN_PERSON_NAMES,
        PERSIST_CHOSEN_GROUP,PERSIST_CHOSEN_GROUP_MEMBERS,
        PERSIST_CHOSEN_GROUP_PROCESSES,
        DELETE_PERSON,
        PERSIST_MEMBERS,
        FILTER_MEMBERS,
        PERSIST_GROUPS,
        PERSIST_PROCESSES,
        FILTER_GROUPS,
        FILTER_PROCESSES} from '../types'


const PersonState = props => {

const initialState = {
    persons : [],
    chosenPerson: null,
    chosenGroup: null,
    chosenGroupMembers: [],
    chosenGroupProcesses: [],
    chosenPersonGroups: [],
    chosenPersonNames: [],
    createGroupMembers: [],
    members: [],
    members2: [],
    connectGroups: [],
    connectGroups2: [],
    connectProcesses: [],
    connectProcesses2: []
}

const [state, dispatch] = useReducer(PersonReducer, initialState)



// Actions :

  // Get all persons
  const getAllPersons = async () => {
    try {
        const res = await axios.get('/api/graph/persons')
        console.log('from actions / persons :  ',res.data)
        dispatch({
            type: GET_ALL_PERSONS,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

  // Search Persons
  const searchPersons = async str => {
    try {
        const res = await axios.get(`/api/graph/persons/byname/${str}`)
        console.log('from actions / persons search :  ',res.data)
        dispatch({
            type: GET_ALL_PERSONS,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

  // Get group
  const getGroup = async (id) => {
    try {
        const res = await axios.get(`/api/persons/groups/${id}`)
        dispatch({
            type: PERSIST_GROUP,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

 // Get Person by id
 const getPersonById = async (id) => {
    try {
        const res = await axios.get(`/api/graph/persons/${id}`)
        console.log("from action getpersonbyid : ",res.data)
        dispatch({
            type: PERSIST_CHOSEN_PERSON,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

 // Get Groups by Person id (chosenGroups)
 const getGroupsByPersonId = async (id) => {
    try {
        const res = await axios.get(`/api/graph/persons/${id}/groups`)
        console.log("from action getgroups of personbyid : ",res.data)
        dispatch({
            type: PERSIST_CHOSEN_PERSON_GROUPS,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

 // Get Names by Person id (chosenPersonNames)
 const getNamesByPersonId = async (id) => {
    try {
        const res = await axios.get(`/api/graph/persons/${id}/names`)
        console.log("from action getnames of personbyid : ",res.data)
        dispatch({
            type: PERSIST_CHOSEN_PERSON_NAMES,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

//get group by id

const getGroupById = async id => {
    try {
        const res = await axios.get(`/api/graph/groups/${id}`)
        console.log("from action getgroup by id : ",res.data)
        dispatch({
            type: PERSIST_CHOSEN_GROUP,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}
// get chosen group members
const getGroupMembersByGroupId = async id => {
    try {
        const res = await axios.get(`/api/graph/groups/${id}/members`)
        console.log("from action getgroup by id : ",res.data)
        dispatch({
            type: PERSIST_CHOSEN_GROUP_MEMBERS,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

// get chosen group processes
const getGroupProcessesByGroupId = async id => {
    try {
        const res = await axios.get(`/api/graph/groups/${id}/processes`)
        console.log("from action getgroup by id processes : ",res.data)
        dispatch({
            type: PERSIST_CHOSEN_GROUP_PROCESSES,
            payload: res.data
        })
    } catch (err) {
       console.log(err)
    }
}

 // Delete chosen person
 const deleteChosenPerson =  () => {
    try {
        dispatch({
            type: DELETE_CHOSEN_PERSON
        })
    } catch (err) {
       console.log(err)
    }
}


 // add Person
 const addPerson = async person => {
    try { 
        console.log('from actions add person',person)
        await axios.post(`/api/graph/persons`,person)
       
    } catch (err) {
       console.log(err)
    }
}

// delete Person
const deletePerson = async id => {
    try { 
        console.log('from actions delete person',id)
        await axios.delete(`/api/graph/persons/${id}`)
       dispatch({
        type: DELETE_PERSON,
        payload: id
       })
    } catch (err) {
       console.log(err)
    }
}


// create group page members

const getMembers = async () => {
    try { 
        console.log('from actions get members')
        const res = await axios.get(`/api/graph/persons`)
       dispatch({
        type: PERSIST_MEMBERS,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}


// connect group process get groups

const getGroups = async () => {
    try { 
        console.log('from actions get groups')
        const res = await axios.get(`/api/graph/groups`)
       dispatch({
        type: PERSIST_GROUPS,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}

const getProcesses = async () => {
    try { 
        console.log('from actions get groups')
        const res = await axios.get(`/api/graph/processes`)
       dispatch({
        type: PERSIST_PROCESSES,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}

  // Filter Members

  const filterMembers = text => {
    dispatch({type: FILTER_MEMBERS , payload: text })
}

  // Filter Groups

  const filterGroups = text => {
    dispatch({type: FILTER_GROUPS , payload: text })
}

  // Filter Processes

  const filterProcesses = text => {
    dispatch({type: FILTER_PROCESSES , payload: text })
}


// Create Group
const createGroup = async data => {
    try { 
        console.log('from actions create Group')
        await axios.post(`/api/graph/groups`,data)
    } catch (err) {
       console.log(err)
    }
}

// Create Process
const createProcess = async data => {
    try { 
        console.log('from actions create Process')
        await axios.post(`/api/graph/processes`,data)
    } catch (err) {
       console.log(err)
    }
}


    return (
        <PersonContext.Provider value={{
            persons: state.persons,
            chosenPerson: state.chosenPerson,
            chosenPersonGroups: state.chosenPersonGroups,
            chosenGroup: state.chosenGroup,
            chosenGroupMembers: state.chosenGroupMembers,
            chosenGroupProcesses: state.chosenGroupProcesses,
            chosenPersonNames: state.chosenPersonNames,
            members: state.members,
            members2: state.members2,
            connectGroups: state.connectGroups,
            connectGroups2: state.connectGroups2,
            connectProcesses: state.connectProcesses,
            connectProcesses2: state.connectProcesses2,
            getGroup,
            getAllPersons,
            searchPersons,
            getPersonById,
            getNamesByPersonId,
            getGroupsByPersonId,
            deleteChosenPerson,
            getGroupById,
            getGroupMembersByGroupId,
            getGroupProcessesByGroupId,
            addPerson,
            deletePerson,
            getMembers,
            filterMembers,
            createGroup,
            createProcess,
            getGroups,
            filterGroups,
            getProcesses,
            filterProcesses
        }}>
            {props.children}
        </PersonContext.Provider>
    )
}

export default PersonState
