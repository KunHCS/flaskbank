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
    if (action.type === ACTION.SIGN_IN) {
        return action.payload;
    }

    return authState;
};

export default combineReducers( {
    myInfo: profileReducer,
    auth: authenticationStateReducer,
});