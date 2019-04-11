import * as ACTION from "../../static/action_type";

export const imageUpLoadReducer = (state = { check: "", save: "" }, action) => {
  switch (action.type) {
    case ACTION.IMAGE_UPLOAD_CHECK:
      return { ...state, check: action.payload };
    case ACTION.IMAGE_UPLOAD_SAVE:
      return { ...state, save: action.payload };
    case ACTION.IMAGE_UPLOAD_CLEAN:
      return { check: "", save: "" };
    default:
      return state;
  }
};
