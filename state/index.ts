import { combineReducers } from "redux";

const initState = {};

function app(state = initState, action: any) {
  switch (action.type) {
    default:
      return state;
  }
}

export default combineReducers({
  app,
});
