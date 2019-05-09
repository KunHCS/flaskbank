import * as ACTION from "../../static/action_type";

export const UpLoadCheckImage = ( state= false, action) => {
    if (action.type === ACTION.IMAGE_ON || action.type === ACTION.IMAGE_OFF) {
        return action.payload;
    }
    return state;
};