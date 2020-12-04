import {GET_ALL_PERSONS,PERSIST_GROUP} from '../types'


export default (state, action) => {
    switch(action.type){
        case GET_ALL_PERSONS:
            return {
                ...state,
                persons : action.payload
            }
            case PERSIST_GROUP:
            return {
                ...state,
                group : action.payload
            }
    }
}