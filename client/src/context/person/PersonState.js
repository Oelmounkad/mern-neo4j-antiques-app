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
        FILTER_PROCESSES,
    PERSIST_ENTITIES1,
PERSIST_ENTITIES2,
PERSIST_ENTITY_LABELS1,
PERSIST_ENTITY_LABELS2,
PERSIST_RELATIONSHIPS,
PERSIST_CHOSEN_NEW_CATEG_PROPERTIES,
PERSIST_NEW_CATEGS} from '../types'


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
    connectProcesses2: [],
    entities1:[],
    entities2:[],
    entities1labels:[],
    entities2labels:[],
    relationships:[],
    newlyAddedCategories:[],
    chosenCategoryProperties:[]
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

// Edit Person
const editPerson = async (id,person) => {
    try { 
        console.log('from actions delete person',id)
        await axios.put(`/api/graph/persons/${id}`,person)
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

// Connect group / process
const connectGroupProcess = async data => {
    try { 
        console.log('from actions connect Group Process')
        await axios.post(`/api/graph/connect/processgroup`,data)
    } catch (err) {
       console.log(err)
    }
}

// Get entities 1

const getEntities1 = async name => {
    try { 
        console.log('from actions get entities1')
        const res = await axios.get(`/api/graph/entities/${name}`)
       dispatch({
        type: PERSIST_ENTITIES1,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}


// Get entities 2

const getEntities2 = async name => {
    try { 
        console.log('from actions get entities2')
        const res = await axios.get(`/api/graph/entities/${name}`)
       dispatch({
        type: PERSIST_ENTITIES2,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}

// Get entity 1 / 2 labels

const getEntityLabels = async () => {
    try { 
        console.log('from actions get entity labels')
        const res = await axios.get(`/api/graph/entities/labels`)
       dispatch({
        type: PERSIST_ENTITY_LABELS1,
        payload: res.data
       })
       dispatch({
        type: PERSIST_ENTITY_LABELS2,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}

// get relationships

const getRelationships = async () => {
    try { 
        console.log('from actions get entity labels')
        const res = await axios.get(`/api/graph/relationships`)
       dispatch({
        type: PERSIST_RELATIONSHIPS,
        payload: res.data
       })

    } catch (err) {
       console.log(err)
    }
}

// Connect two entities

const connectTwoEntities = async (data) => {
    try { 
        console.log('from actions connect two entities')
        await axios.post(`/api/graph/connect/general`,data)

    } catch (err) {
       console.log(err)
    }
}

// Add category

const addCategory = async data => {

    try {
        await axios.post(`/api/graph/categories`,data)
    } catch (error) {
        console.log(error)
    }
}

// Get newly added categories

const getNewlyAddedCategories = async () => {
    try { 
        console.log('from actions get entities1')
        const res = await axios.get(`/api/graph/categories`)
       dispatch({
        type: PERSIST_NEW_CATEGS,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}

// Get newly added categories

const getPropertiesForCategory = async name => {
    try { 
        console.log('from actions get entities1')
        const res = await axios.get(`/api/graph/categories/properties/${name}`)
       dispatch({
        type: PERSIST_CHOSEN_NEW_CATEG_PROPERTIES,
        payload: res.data
       })
    } catch (err) {
       console.log(err)
    }
}

const addObject = async data => {
    try { 
        const res = await axios.post(`/api/graph/objects`,data)
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
            entities1: state.entities1,
            entities2: state.entities2,
            entities1labels: state.entities1labels,
            entities2labels: state.entities2labels,
            relationships: state.relationships,
            newlyAddedCategories: state.newlyAddedCategories,
            chosenCategoryProperties:state.chosenCategoryProperties,
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
            filterProcesses,
            connectGroupProcess,
            editPerson,
            getEntities1,
            getEntities2,
            getEntityLabels,
            getRelationships,
            connectTwoEntities,
            addCategory,
            getNewlyAddedCategories,
            getPropertiesForCategory,
            addObject
        }}>
            {props.children}
        </PersonContext.Provider>
    )
}

export default PersonState
