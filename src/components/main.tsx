import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { set_dark, set_light } from "../Redux/Actions/Theme/action";
import styles from "../Styles/main.module.scss";
import { RootState } from "../Redux/store";
import { v4 as uuid } from "uuid";
import { toast } from "react-toastify";
import {
  Grid,
  Hidden,
  List,
  ListItem,
  ListItemText,
  Checkbox,
} from "@mui/material";

import WbSunnyIcon from "@mui/icons-material/WbSunny";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ClearIcon from "@mui/icons-material/Clear";

import imgBack from "../Assets/img/background.jpg";

const Main = () => {
  var dispatch = useDispatch();
  var toggel = useSelector((state: RootState) => state.Theme.toggel);

  interface listType {
    id: string;
    task: string;
    completed: boolean;
  }

  var get: string | null = localStorage.getItem("list");
  var Data: listType[];
  var countleft: number;
  if (get) {
    Data = JSON.parse(get);
    countleft = 0;
    Data.forEach((each) => {
      !each.completed && countleft++;
    });
  } else {
    Data = [];
    countleft = 0;
  }

  //hooks
  const [list, setlist] = React.useState(Data);
  const [active, setActive] = React.useState(false);
  const [completed, setCompleted] = React.useState(false);
  const [All, setAll] = React.useState(true);

  // theme toggle
  var SwitchTheme = () => {
    if (!toggel) dispatch(set_dark());
    else dispatch(set_light());
  };

  var handelInput = (e: any) => {
    if (e.key === "Enter" || e.type === "click") {
      let input = document.querySelector<HTMLInputElement>("#input")!.value;
      document.querySelector<HTMLInputElement>("#input")!.value = "";
      if (input === "")
        return toast.error("No Task Entered", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });

      var newTask: listType = {
        id: uuid(),
        task: input[0].toUpperCase() + input.substring(1),
        completed: false,
      };
      Data.push(newTask);

      save(Data);
    }
  };

  var deleteTask = (id: string) => {
    var newDel = Data.filter((each) => each.id !== id);
    save(newDel);
  };

  var handelDone = (id: string) => {
    var checkedData = Data.map((each) => {
      if (each.id === id) each.completed = !each.completed;
      return each;
    });
    save(checkedData);
  };

  var showAll = () => {
    setAll(true);
    setActive(false);
    setCompleted(false);
  };

  var showACtive = () => {
    setAll(false);
    setActive(true);
    setCompleted(false);
  };

  var showDone = () => {
    setAll(false);
    setActive(false);
    setCompleted(true);
  };

  var clearDone = () => {
    var allClear = Data.filter((each) => !each.completed);
    save(allClear);
  };

  var save = (Data: listType[]) => {
    localStorage.setItem("list", JSON.stringify(Data));
    setlist([...Data]);
  };

  var ItemProp = ({ each }) => {
    return (
      <ListItem className={styles.listItem}>
        <Checkbox
          edge="start"
          className={styles.listcheck}
          color="primary"
          checked={each.completed}
          onChange={() => handelDone(each.id)}
        />
        <ListItemText hidden={each.completed} className={styles.listTxt}>
          {each.task}
        </ListItemText>
        <ListItemText hidden={!each.completed} className={styles.listTxtDone}>
          {each.task}
        </ListItemText>
        <ClearIcon
          className={styles.clear}
          onClick={() => deleteTask(each.id)}
        />
      </ListItem>
    );
  };

  return (
    <>
      <img src={imgBack} alt="background" className="wrapperBack" />
      <div className="toplayer">
        <Grid container direction="column" alignContent="center" spacing={1}>
          <div className={styles.container}>
            <div className={styles.heading}>
              <h1> T O D O</h1>
              <span hidden={!toggel} onClick={SwitchTheme}>
                <WbSunnyIcon className={styles.themeSun} />
              </span>
              <span hidden={toggel} onClick={SwitchTheme}>
                <NightsStayIcon className={styles.themeMoon} />
              </span>
            </div>
          </div>

          <div className={styles.container}>
            <div className={styles.input}>
              <AddCircleOutlineIcon
                className={styles.pen}
                onClick={handelInput}
              />
              <input
                type="text"
                placeholder="Create a new todo ..."
                id="input"
                onKeyDown={handelInput}
                autoComplete="off"
                autoFocus
              />
            </div>
          </div>

          <div className={styles.container}>
            <List className={styles.list}>
              {list.length > 0 ? (
                list.map((each) => {
                  if (active && !each.completed)
                    return <ItemProp each={each} key={each.id} />;
                  if (completed && each.completed)
                    return <ItemProp each={each} key={each.id} />;
                  if (All) return <ItemProp each={each} key={each.id} />;
                  return null;
                })
              ) : (
                <ListItem>
                  <ListItemText className={styles.listTxt}>
                    {" "}
                    No Task available
                  </ListItemText>
                </ListItem>
              )}

              {list.length > 0 && (
                <div className={styles.nav}>
                  <p> {countleft} task left</p>
                  <Hidden lgDown>
                    <div className={styles.navItem}>
                      <p className={All ? `active` : ""} onClick={showAll}>
                        {" "}
                        All
                      </p>
                      <p
                        className={active ? `active` : ""}
                        onClick={showACtive}
                      >
                        {" "}
                        Active
                      </p>
                      <p
                        className={completed ? `active` : ""}
                        onClick={showDone}
                      >
                        {" "}
                        completed
                      </p>
                    </div>
                  </Hidden>
                  <p className="cursor" onClick={clearDone}>
                    clear completed
                  </p>
                </div>
              )}
            </List>
          </div>

          {list.length > 0 && (
            <div className={styles.container}>
              <div className={styles.navMob}>
                <Hidden mdUp>
                  <div className={styles.navItemMob}>
                    <p className={All ? `active` : ""} onClick={showAll}>
                      {" "}
                      All
                    </p>
                    <p className={active ? `active` : ""} onClick={showACtive}>
                      {" "}
                      Active
                    </p>
                    <p className={completed ? `active` : ""} onClick={showDone}>
                      {" "}
                      completed
                    </p>
                  </div>
                </Hidden>
              </div>
            </div>
          )}

          <div className={styles.footer}>
            <p>
              Made by{" "}
              <a
                href="https://www.instagram.com/developer_dev/?hl=en"
                target="_blank"
                rel="noreferrer"
              >
                Chandrasekhar{" "}
              </a>
            </p>
          </div>
        </Grid>
      </div>
    </>
  );
};

export default Main;
