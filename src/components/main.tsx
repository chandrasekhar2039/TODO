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

      <Grid container direction="column" alignContent="center" spacing={1}>

        <div  className={styles.container}>
          <h1> TODO</h1>
          <span hidden={!toggel} onClick={SwitchTheme}><WbSunnyIcon className={styles.themeSun} /></span>
          <span hidden={toggel} onClick={SwitchTheme}><NightsStayIcon className={styles.themeMoon} /></span>
        </div>

        <div  className={styles.container}>
          <List className={styles.list} >
            <ListItem className={styles.listItem}>
                <Checkbox edge="start" className={styles.listcheck}  color="primary"/>
                <ListItemText className={styles.listTxt}>Todo list item one </ListItemText>
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
          </List>
        </div>

        <div  className={styles.container} >
          <h1 > Hello from main</h1>
        </div>

        <div  className={styles.container}>
          <h1 > Hello from main</h1>
        </div>

        <div  className={styles.container}>
          <h1 > Hello from main</h1>
        </div>

    </Grid>
  )
}


export default Main;
