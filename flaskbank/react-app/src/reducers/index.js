import {combineReducers} from 'redux'
import * as ACTION from "../static/action_type";
import {authenticationRequestReducer, authenticationStateReducer} from "./AuthenticationReducer/authenticationReducer";
import {profileReducer} from "./ProfileReducer/profileReducer";
import {accountDetailsReducer} from "./AccountDetailReducer/accountDetailsReducer";



export default combineReducers( {
    myInfo   :  profileReducer,
    auth     :  authenticationStateReducer,
    myKey    :  authenticationRequestReducer,
    myDetail :  accountDetailsReducer,
});



