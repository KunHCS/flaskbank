import * as ACTION from "../../static/action_type";



export const imageUpLoadAction_Check = (payload) =>{
    return {
        type: ACTION.IMAGE_UPLOAD_CHECK,
        payload: payload,
    };
};


export const imageUpLoadAction_Save = (payload) =>{
    return {
        type: ACTION.IMAGE_UPLOAD_SAVE,
        payload: payload,
    };
};


export const imageUpLoadAction_Clean = () =>{
    return {
        type: ACTION.IMAGE_UPLOAD_CLEAN,
        payload: "",
    };
};
