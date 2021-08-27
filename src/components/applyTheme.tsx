import {useEffect} from "react"
import {useSelector} from "react-redux";
import {RootState} from "../Redux/store"

const ApplyTheme = ({children})=>{

  let state = useSelector((state:RootState) => state.Theme.value);
  

  useEffect(()=>{
  changeTheme(state);
  },[state])

  return children
}

const changeTheme =(theme:object)=>{
  var keys:string[] = Object.keys(theme);
  var values:string[] = Object.values(theme);

keys.forEach((variables, index)=>{
  document.documentElement.style.setProperty(
        variables,
        values[index]
      );
})
}

export default ApplyTheme;
