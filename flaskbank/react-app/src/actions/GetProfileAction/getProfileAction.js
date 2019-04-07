import * as ACTION from "../../static/action_type";


export const getProfile = (payload) =>{
    return {
        type: ACTION.GET_PROFILE,
        payload: payload,
    };
};


export const cleanProfile = () =>{
    return {
        type: ACTION.CLEAN_PROFILE,
        payload: " ",
    };
};