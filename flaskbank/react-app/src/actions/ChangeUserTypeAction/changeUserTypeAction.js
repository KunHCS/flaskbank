import * as ACTION from "../../static/action_type";


export const changeUserType= (payload) =>{
    return {
        type: ACTION.USERTYPE,
        payload: payload,
    };
};


export const cleanUserType= () =>{
    return {
        type: ACTION.USERTYPE,
        payload: "",
    };
};
