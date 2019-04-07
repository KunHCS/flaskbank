import * as ACTION from "../../static/action_type";
import axios from "axios";
const ROOT_URL = "http://localhost:5000/api";

export const loginAction = () =>{
    return {
        type: ACTION.SIGN_IN,
        payload: true,
    };
};


export const logOutAction = () =>{
    return {
        type: ACTION.SIGN_OUT,
        payload: false,
    };
};



export function logInRequest(response){
    return {
        type: ACTION.LOG_IN,
        payload: response
    };
}


export function logOutRequest(){
    return {
        type: ACTION.LOG_OUT,
        payload: " ",
    };
}
