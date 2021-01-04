import {GET_ALL_PERSONS,PERSIST_GROUP,PERSIST_CHOSEN_PERSON,DELETE_CHOSEN_PERSON,PERSIST_CHOSEN_PERSON_GROUPS,PERSIST_CHOSEN_GROUP,PERSIST_CHOSEN_GROUP_MEMBERS,
    DELETE_PERSON,PERSIST_CHOSEN_GROUP_PROCESSES,PERSIST_CHOSEN_PERSON_NAMES,PERSIST_MEMBERS,FILTER_MEMBERS,PERSIST_GROUPS,PERSIST_PROCESSES,FILTER_GROUPS,FILTER_PROCESSES} from '../types'


export default (state, action) => {
    switch(action.type){
        case GET_ALL_PERSONS:
            return {
                ...state,
                persons : action.payload
            }
            case PERSIST_MEMBERS:
            return {
                ...state,
                members : action.payload,
                members2: action.payload
            }
            case FILTER_MEMBERS:
            return {
                ...state,
                members2 : state.members2.filter(mem => {
                    const regex = new RegExp(`${action.payload}`, 'gi')
                    return mem.properties.name.match(regex)
                })
            }
            case PERSIST_GROUPS:
            return {
                ...state,
                connectGroups : action.payload,
                connectGroups2 : action.payload
            }
            case PERSIST_PROCESSES:
            return {
                ...state,
                connectProcesses : action.payload,
                connectProcesses2 : action.payload
            }
            case FILTER_GROUPS:
                return {
                    ...state,
                    connectGroups2 : state.connectGroups2.filter(gr => {
                        const regex = new RegExp(`${action.payload}`, 'gi')
                        return gr.properties.label.match(regex)
                    })
                }
                case FILTER_PROCESSES:
                    return {
                        ...state,
                        connectProcesses2 : state.connectProcesses2.filter(pr => {
                            const regex = new RegExp(`${action.payload}`, 'gi')
                            return pr.properties.label.match(regex)
                        })
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
                case PERSIST_CHOSEN_GROUP_PROCESSES:
                return {
                    ...state,
                    chosenGroupProcesses : action.payload
                }
            case PERSIST_CHOSEN_PERSON_GROUPS:
            return{
                ...state,
                chosenPersonGroups: action.payload
            }
            case PERSIST_CHOSEN_PERSON_NAMES:
            return{
                ...state,
                chosenPersonNames: action.payload
            }
            case DELETE_CHOSEN_PERSON:
                return {
                    ...state,
                    chosenPerson : null
                }
    }
}