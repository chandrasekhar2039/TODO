import {dark,Light} from "../../Styles/theme";


const init = {
  value:dark,
  toggel:true
};


const themeReducers = (state=init , { type })=>{
  switch(type){
    case "DARK":
    return {value:dark, toggel:true};
    case "LIGHT":
    return {value:Light, toggel:false};
    default :
    return state
  }
}


export default themeReducers;
