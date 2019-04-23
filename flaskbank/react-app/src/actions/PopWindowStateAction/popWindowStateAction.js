import * as ACTION from "../../static/action_type";


export const openPopWindow= () =>{
    return {
        type: ACTION.WINDOWSTATE,
        payload: true,
    };
};

export const closePopWindow= () =>{
    return {
        type: ACTION.WINDOWSTATE,
        payload: false,
    };
};