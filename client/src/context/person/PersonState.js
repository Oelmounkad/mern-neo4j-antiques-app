import React,{useReducer} from 'react'
import PersonContext from './PersonContext'
import PersonReducer from './PersonReducer'
import axios from 'axios'
import {GET_ALL_PERSONS,PERSIST_GROUP} from '../types'


const PersonState = props => {

const initialState = {
    persons : [],
    group: null
}

const [state, dispatch] = useReducer(PersonReducer, initialState)



// Actions :

  // Get all persons
  const getAllPersons = async () => {
    try {
        const res = await axios.get('/api/persons')
        console.log('from actions / persons :  ',res.data)
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



    return (
        <PersonContext.Provider value={{

            persons: state.persons,
            group: state.group,
            getGroup,
            getAllPersons
        }}>
            {props.children}
        </PersonContext.Provider>
    )
}

export default PersonState
