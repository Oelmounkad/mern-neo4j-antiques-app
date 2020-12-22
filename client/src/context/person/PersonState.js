import React,{useReducer} from 'react'
import PersonContext from './PersonContext'
import PersonReducer from './PersonReducer'
import axios from 'axios'
import {GET_ALL_PERSONS,PERSIST_CHOSEN_PERSON,
        PERSIST_GROUP,DELETE_CHOSEN_PERSON,
        PERSIST_CHOSEN_PERSON_GROUPS,
        PERSIST_CHOSEN_GROUP} from '../types'


const PersonState = props => {

const initialState = {
    persons : [],
    chosenPerson: null,
    chosenGroup: null,
    chosenPersonGroups: []
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



    return (
        <PersonContext.Provider value={{
            persons: state.persons,
            chosenPerson: state.chosenPerson,
            chosenPersonGroups: state.chosenPersonGroups,
            chosenGroup: state.chosenGroup,
            getGroup,
            getAllPersons,
            searchPersons,
            getPersonById,
            getGroupsByPersonId,
            deleteChosenPerson,
            getGroupById
        }}>
            {props.children}
        </PersonContext.Provider>
    )
}

export default PersonState
