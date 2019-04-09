import * as ACTION from "../../static/action_type";


export const imageUpLoadReducer = ( state= {check:"", save:""}, action) => {
    console.log("ImageUpLoadReducer");
    switch(action.type){
        case ACTION.IMAGE_UPLOAD_CHECK:
            console.log("1111111");
            return {...state, check:action.payload};
        case ACTION.IMAGE_UPLOAD_SAVE:
            console.log("2222222");
            return {...state, save:action.payload};
        default :
            console.log("33333");
            return state;
    }
};



