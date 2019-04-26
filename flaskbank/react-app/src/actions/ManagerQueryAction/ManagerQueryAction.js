import * as ACTION from "../../static/action_type";



export const saveQueryResult = (payload) =>{
    return {
        type: ACTION.QUERY,
        payload: payload,
    };
};


export const cleanQueryResult = () =>{
    return {
        type: ACTION.CLEAN_QUERY,
        payload: false,
    };
};


