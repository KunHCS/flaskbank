import * as ACTION from "../static/action_type";
import axios from "axios";
const ROOT_URL = "http://localhost:5000/api";

export const logInAction = () =>{
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



export function logInRequest(username, password){
    const request = userlogin => axios.post('api/login', {
        username: username,
        password: password
    });
    console.log(username);
    return {
        type: ACTION.LOG_IN,
        payload: request
    };
}

