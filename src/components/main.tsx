import {useDispatch,useSelector} from "react-redux";
import {set_dark,set_light} from "../Redux/Actions/Theme/action";
import styles from "../Styles/main.module.scss"
import {RootState} from "../Redux/store"
import {
  Container,
  Grid,
  Hidden,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Checkbox,
  FormControlLabel,
  CheckboxProps
} from "@material-ui/core"

import WbSunnyIcon from '@material-ui/icons/WbSunny';
import NightsStayIcon from '@material-ui/icons/NightsStay';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';

import imgBack from "../Assets/img/background.jpg"


const Main=()=>{
var dispatch = useDispatch();
var toggel = useSelector((state:RootState)=> state.Theme.toggel);


var SwitchTheme=()=>{
  if(!toggel)
  dispatch(set_dark());
  else
  dispatch(set_light());

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
        <AddCircleOutlineIcon className={styles.pen}/>
        <input type="text" placeholder="Create a new todo ..."/>
      </div>
    </div>

    <div  className={styles.container}>
      <List className={styles.list} >
        <ListItem className={styles.listItem}>
            <Checkbox edge="start" className={styles.listcheck}  color="primary"/>
            <ListItemText className={styles.listTxt}>Lorem ipsum dolor sit amet, commodo consequat.  </ListItemText>
        </ListItem>

        <ListItem className={styles.listItem}>
            <Checkbox edge="start" className={styles.listcheck} color="primary"/>
            <ListItemText className={styles.listTxt}>Todo list item two </ListItemText>
        </ListItem>

        <ListItem className={styles.listItem}>
            <Checkbox edge="start" className={styles.listcheck} color="primary"/>
            <ListItemText className={styles.listTxt}>Todo list item three </ListItemText>
        </ListItem>

        <ListItem className={styles.listItem}>
            <Checkbox edge="start" className={styles.listcheck} color="primary"/>
            <ListItemText className={styles.listTxt}>Todo list item four </ListItemText>
        </ListItem>

        <ListItem className={styles.listItem}>
            <Checkbox edge="start" className={styles.listcheck} color="primary"/>
            <ListItemText className={styles.listTxt}>Todo list item five </ListItemText>
        </ListItem>

        <ListItem className={styles.listItem}>
            <Checkbox edge="start" className={styles.listcheck} color="primary"/>
            <ListItemText className={styles.listTxt}>Todo list item six </ListItemText>
        </ListItem>

        <div className={styles.nav} >
          <p> 5 items left</p>
            <Hidden smDown>
              <div className={styles.navItem}>
                <p className="active"> All</p>
                <p> Active</p>
                <p> completed</p>
              </div>
            </Hidden>
          <p className="cursor">clear completed</p>
        </div>
      </List>
    </div>

    <div className={styles.container}>
      <div className={styles.navMob}>
        <Hidden mdUp>
          <div className={styles.navItemMob}>
            <p className="active"> All</p>
            <p> Active</p>
            <p> completed</p>
          </div>
        </Hidden>
      </div>
    </div>

    <div  className={styles.footer}>
      <p>Made by <a href="https://www.instagram.com/developer_dev/?hl=en" target="_blank">Chandrasekhar </a></p>
    </div>

</Grid>
</div>
</>
  )
}


export default Main;
