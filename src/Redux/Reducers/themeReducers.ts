import {dark,Light} from "../../Styles/theme";

const init:object = dark;


const themeReducers = (state:object=init , { type })=>{
  switch(type){
    case "DARK":
    return dark;
    case "LIGHT":
    return Light
    default :
    return state
  }
}

export default themeReducers;
