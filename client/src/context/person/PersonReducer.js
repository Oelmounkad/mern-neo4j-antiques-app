import {GET_ALL_PERSONS,PERSIST_GROUP,PERSIST_CHOSEN_PERSON,DELETE_CHOSEN_PERSON,PERSIST_CHOSEN_PERSON_GROUPS,PERSIST_CHOSEN_GROUP,PERSIST_CHOSEN_GROUP_MEMBERS,
    DELETE_PERSON} from '../types'


export default (state, action) => {
    switch(action.type){
        case GET_ALL_PERSONS:
            return {
                ...state,
                persons : action.payload
            }
            case DELETE_PERSON:
            return {
                ...state,
                persons : state.persons.filter(p => p.identity.low !== action.payload)
            }
            case PERSIST_GROUP:
            return {
                ...state,
                group : action.payload
            }
            case PERSIST_CHOSEN_PERSON:
            return {
                ...state,
                chosenPerson : action.payload
            }
            case PERSIST_CHOSEN_GROUP:
                return {
                    ...state,
                    chosenGroup : action.payload
                }
                case PERSIST_CHOSEN_GROUP_MEMBERS:
                return {
                    ...state,
                    chosenGroupMembers : action.payload
                }
            case PERSIST_CHOSEN_PERSON_GROUPS:
            return{
                ...state,
                chosenPersonGroups: action.payload
            }
            case DELETE_CHOSEN_PERSON:
                return {
                    ...state,
                    chosenPerson : null
                }
    }
}