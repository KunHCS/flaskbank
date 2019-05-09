import * as ACTION from "../../static/action_type";


export const uploadImageOn = () =>{
    return {
        type: ACTION.IMAGE_ON,
        payload: true,
    };
};


export const uploadImageOff = () =>{
    return {
        type: ACTION.IMAGE_OFF,
        payload: false,
    };
};


