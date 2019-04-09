import * as ACTION from "../../static/action_type";



export const imageUpLoadAction_Check = (payload) =>{
    console.log("img check");
    return {
        type: ACTION.IMAGE_UPLOAD_CHECK,
        payload: payload,
    };
};


export const imageUpLoadAction_Save = (payload) =>{
    console.log("img save");
    return {
        type: ACTION.IMAGE_UPLOAD_SAVE,
        payload: payload,
    };
};



