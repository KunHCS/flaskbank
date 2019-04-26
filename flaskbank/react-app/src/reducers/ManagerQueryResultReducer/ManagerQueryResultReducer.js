import * as ACTION from "../../static/action_type";


export const ManagerQueryResultReducer = ( state ="", action) => {
    switch(action.type){
        case ACTION.QUERY :
            return action.payload;
        case ACTION.CLEAN_QUERY :
            return " ";
        default :
            return state;
    }
};