import * as ACTION from "../../static/action_type";


export const profileReducer = ( profile = " ", action) => {
   if (action.type === ACTION.GET_PROFILE){
       return action.payload
   }

   return profile;
};


