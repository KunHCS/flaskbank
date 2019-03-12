import {combineReducers} from 'redux'


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

const authState = () => {
  return {signInState: false }
};

const authentication = (valid = null, action) => {
    if (action.type === 'valid') {
        return action.pass;
    }

    return valid;
};

export default combineReducers( {
    myInfo: profileReducer,
    myValidation: authentication,
    isSignedIn: authState,
});