import * as ACTION from "../../static/action_type";

export const windowOpenCloseReducer = ( state = {state1:false, state2: false}, action) => {
    switch (action.type) {
        case ACTION.WINDOWSTATE_1:
            return { ...state, state1: action.payload };
        case ACTION.WINDOWSTATE_2:
            return { ...state, state2: action.payload };
        case ACTION.WINDOWSTATE_CLEAN:
            return { state1: false, state2: false };
        default:
            return state;
    }
};




