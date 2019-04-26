import * as ACTION from "../../static/action_type";


export const profileReducer = ( profile = " ", action) => {
    switch(action.type){
        case ACTION.GET_PROFILE :
            return action.payload;
        case ACTION.CLEAN_PROFILE:
            console.log("clean profile");
            return " ";
        default :
            return profile;
    }

};

