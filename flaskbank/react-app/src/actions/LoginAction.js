import * as ACTION from "../static/action_type";


export const logInAction = (payload) =>{
    return {
        type: ACTION.SIGN_IN,
        payload: payload,
    };
};

