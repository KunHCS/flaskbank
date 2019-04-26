import * as ACTION from "../../static/action_type";


export const clientInformation = ( profile = " ", action) => {
    switch(action.type){
        case ACTION.GET_CLIENT_INFO :
            return action.payload;
        case ACTION.CLEAN_CLIENT_INFO :
            console.log("clean profile");
            return " ";
        default :
            return profile;
    }

};

