import {combineReducers} from 'redux'


const profileReducer = () => {
  return [
      {username:""},
      {password:""},
      {first_name:""},
      {last_name:""},
      {email:""},
      {checkingAccount:""},
      {savingAccount:""},
      {creditCardAccount:""},
  ]  ;
};


const authentication = (valid = null, action) => {
    if (action.type === 'valid') {
        return action.pass;
    }

    return valid;
};

export default combineReducers( {
    myInfo: profileReducer,
    myValidation: authentication
});