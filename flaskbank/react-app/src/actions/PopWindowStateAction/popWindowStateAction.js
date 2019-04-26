import * as ACTION from "../../static/action_type";


export const openPopWindow1= () =>{
    return {
        type: ACTION.WINDOWSTATE_1,
        payload: true,
    };
};

export const openPopWindow2= () =>{
    return {
        type: ACTION.WINDOWSTATE_2,
        payload: true,
    };
};


export const closePopWindow= () =>{
    return {
        type: ACTION.WINDOWSTATE_CLEAN,
        payload: false,
    };
};