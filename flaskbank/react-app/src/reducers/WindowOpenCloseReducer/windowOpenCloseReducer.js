import * as ACTION from "../../static/action_type";

export const windowOpenCloseReducer = ( state = false, action) => {
    if (action.type === ACTION.WINDOWSTATE) {
        return action.payload;
    }
    return state;
};
