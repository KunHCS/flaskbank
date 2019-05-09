import {combineReducers} from 'redux'
import * as ACTION from "../static/action_type";
import {authenticationRequestReducer, authenticationStateReducer,authenticationUserTypeReducer} from "./AuthenticationReducer/authenticationReducer";
import {profileReducer} from "./ProfileReducer/profileReducer";
import {accountDetailsReducer} from "./AccountDetailReducer/accountDetailsReducer";
import {imageUpLoadReducer} from "./ImageUpLoadReducer/imageUpLoadReducer";
import {windowOpenCloseReducer} from "./WindowOpenCloseReducer/windowOpenCloseReducer";
import {ManagerQueryResultReducer} from "./ManagerQueryResultReducer/ManagerQueryResultReducer";
import {clientInformation} from "./ClientsInformation/clientsInformation";
import {UpLoadCheckImage} from "./UploadCheckImage/UpLoadCheckImage";

export default combineReducers( {
    myInfo   :  profileReducer,
    auth     :  authenticationStateReducer,
    myKey    :  authenticationRequestReducer,
    myDetail :  accountDetailsReducer,
    myImage  :  imageUpLoadReducer,
    popWindowState : windowOpenCloseReducer,
    userType : authenticationUserTypeReducer,
    queryResult : ManagerQueryResultReducer,
    myClientsInfo : clientInformation,
    myImageState : UpLoadCheckImage,

});



