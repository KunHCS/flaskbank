import * as ACTION from "../../static/action_type";




export const accountDetailAction = (payload) =>{
    return {
        type: ACTION.ACCOUNT_DETAIL,
        payload: payload,
    };
};
