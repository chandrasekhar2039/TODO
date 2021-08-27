import {dark,Light} from "../../Styles/theme";


const init = {
  value:dark,
  toggel:true
};


const themeReducers = (state=init , { type })=>{
  switch(type){
    case "DARK":
    return {value:dark, toggel:false};
    case "LIGHT":
    return {value:Light, toggel:true};
    default :
    return state
  }
}


export default themeReducers;
