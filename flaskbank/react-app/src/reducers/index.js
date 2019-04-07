import {combineReducers} from 'redux'
import * as ACTION from "../static/action_type";


const profileReducer = () => {
  return [
      {username:"Tim1991"},
      {password:"123"},
      {first_name:"Tim"},
      {last_name:"Shark"},
      {email:"tim6000@gmail.com"},
      {checkingAccount:"1029384757"},
      {savingAccount:"029385182"},
      {creditCardAccount:"12345245"},
  ]  ;
};


const authenticationStateReducer = ( authState=false, action) => {
    if (action.type === ACTION.SIGN_IN || action.type === ACTION.SIGN_OUT) {
        return action.payload;
    }

    return authState;
};

const authenticationRequestReducer = (state = '', action) => {
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

export default combineReducers( {
    myInfo:  profileReducer,
    auth  :  authenticationStateReducer,
    myKey   :  authenticationRequestReducer,
});




//
// export default function(state = '', action){
//     switch(action.type){
//         case ACTION.SIGN_IN:
//             return action.payload.data.success === true ? action.payload.data.email : 'error';
//         case ACTION.LOG_IN:
//             return typeof action.payload.data !== 'undefined' && action.payload.data.loggedin === true ? action.payload.data.loggedin : false;
//         default:
//             return state;
//     }
// }
