import React from "react"
import {useDispatch,useSelector} from "react-redux";
import {set_dark,set_light} from "../Redux/Actions/Theme/action";
import styles from "../Styles/main.module.scss"
import {RootState} from "../Redux/store"
import { v4 as uuid } from 'uuid';
import { toast } from 'react-toastify';
import {
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Checkbox
} from "@material-ui/core"

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import ClearIcon from '@material-ui/icons/Clear';

import imgBack from "../Assets/img/background.jpg"



const Main=()=>{
var dispatch = useDispatch();
var toggel = useSelector((state:RootState)=> state.Theme.toggel);

interface listType {
  id:string,
  task:string,
  completed:boolean
}

var get:string | null  = localStorage.getItem("list");
var Data:listType[]
var countleft:number
if(get){
  Data = JSON.parse(get);
  countleft=0;
  Data.map(each=>{
    !each.completed && countleft++;
  })
}
else{
  Data = [];
  countleft=0;
}

//hooks
const [list, setlist] = React.useState(Data);

// theme toggle
var SwitchTheme=()=>{
  if(!toggel)
  dispatch(set_dark());
  else
  dispatch(set_light());
}


var handelInput =(e:any)=>{
  if( e.key === "Enter" || e.type === "click" ){
    let input = document.querySelector <HTMLInputElement>("#input")!.value;
    document.querySelector <HTMLInputElement>("#input")!.value="";
    if(input === '')
    return toast.error('Empty Task', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          });

    var newTask:listType={
      id:uuid(),
      task:input[0].toUpperCase() + input.substring(1),
      completed:false
    }
  Data.push(newTask);

  save(Data);
  }
}

var deleteTask=()=>{
  alert("delete");

}


var handelDone =()=>{
  alert("i m done");

}

var showAll=()=>{
  alert("all");
}

var showACtive=()=>{
  alert("ative");
}

var showDone=()=>{
  alert("done all");
}

var clearDone=()=>{
  alert(" all clear");
}








var save=(Data)=>{
  localStorage.setItem("list", JSON.stringify(Data));
  setlist([...Data]);
}


  return(
<>
  <img src={imgBack} alt="background" className="wrapperBack"/>
<div className="toplayer">
  <Grid container direction="column" alignContent="center" spacing={1} >

    <div  className={styles.container}>
      <div className={styles.heading}>
        <h1> T O D O</h1>
        <span hidden={!toggel} onClick={SwitchTheme}><WbSunnyIcon className={styles.themeSun} /></span>
        <span hidden={toggel} onClick={SwitchTheme}><NightsStayIcon className={styles.themeMoon} /></span>
      </div>
    </div>

    <div  className={styles.container}>
      <div className={styles.input}>
        <AddCircleOutlineIcon className={styles.pen} onClick={handelInput} />
        <input type="text" placeholder="Create a new todo ..." id="input" onKeyDown={handelInput} autoComplete="off" />
      </div>
    </div>

    <div  className={styles.container}>
      <List className={styles.list} >

        {
          list.length > 0
           ? list.map((each)=>{
              return <ListItem className={styles.listItem} key={each.id}>
                  <Checkbox edge="start" className={styles.listcheck} color="primary" defaultChecked={each.completed}  onChange={handelDone} />
                  <ListItemText className={styles.listTxt}>{each.task}</ListItemText>
                  <ClearIcon className={styles.clear} onClick={deleteTask}/>
              </ListItem>
            })
             :
             <ListItem>
                 <ListItemText className={styles.listTxt}>No Task available</ListItemText>
             </ListItem>
        }

        {list.length > 0 && <div className={styles.nav} >
          <p> {countleft} items left</p>
            <Hidden smDown>
              <div className={styles.navItem}>
                <p className="active" onClick={showAll}> All</p>
                <p onClick={showACtive}> Active</p>
                <p onClick={showDone}> completed</p>
              </div>
            </Hidden>
          <p className="cursor" onClick={clearDone}>clear completed</p>
        </div>}
      </List>
    </div>

    {list.length > 0 && <div className={styles.container}>
      <div className={styles.navMob}>
        <Hidden mdUp>
          <div className={styles.navItemMob}>
            <p className="active" onClick={showAll}> All</p>
            <p onClick={showACtive}> Active</p>
            <p onClick={showDone}> completed</p>
          </div>
        </Hidden>
      </div>
    </div>}

    <div  className={styles.footer}>
      <p>Made by <a href="https://www.instagram.com/developer_dev/?hl=en" target="_blank" rel="noreferrer" >Chandrasekhar </a></p>
    </div>

</Grid>
</div>
</>
  )
}


export default Main;
