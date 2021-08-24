import {LIGHT,DARK} from "./actionTypes";

type action={
  type:string,
  payload?:any
}

export var set_dark=():action =>{
  return {
    type:DARK
  }
}

export var set_light=()=>{
  return {
    type:LIGHT
  }
}
