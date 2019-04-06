import * as ACTION from "../static/action_type";


export const logInAction = () =>{
    return {
        type: ACTION.SIGN_IN,
        payload: true,
    };
};


export const logOutAction = () =>{
    return {
        type: ACTION.SIGN_IN,
        payload: false,
    };
};
