import * as ACTION from "../../static/action_type";


export const getClientsInfo = (payload) =>{
    return {
        type: ACTION.GET_CLIENT_INFO,
        payload: payload,
    };
};


export const cleanClientsInfo = () =>{
    return {
        type: ACTION.CLEAN_CLIENT_INFO,
        payload: " ",
    };
};