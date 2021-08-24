import style from "./themeReducers";
import {combineReducers} from "redux";

const rootReducers = combineReducers({
  Theme:style
})

export default rootReducers;
