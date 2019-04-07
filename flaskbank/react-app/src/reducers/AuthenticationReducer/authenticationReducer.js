import * as ACTION from "../../static/action_type";

export const authenticationStateReducer = ( authState=false, action) => {
    if (action.type === ACTION.SIGN_IN || action.type === ACTION.SIGN_OUT) {
        return action.payload;
    }
    return authState;
};


export const authenticationRequestReducer = (state = '', action) => {
    console.log("yeah yeah eayh");
    console.log(action.payload);

    switch(action.type){
        case ACTION.LOG_IN :
            return action.payload.status == "201" ? action.payload.data.access_token : " ";
        case ACTION.LOG_OUT :
            return " ";
        default :
            return state;
    }

};