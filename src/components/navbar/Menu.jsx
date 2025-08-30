import * as React from "react";
import AxiosInstance from "../../Axios";
import { useState, useEffect } from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import { Link, useLocation, useNavigate } from "react-router";
import checkLoginLink from "../../SimpleFunctions";

export default function Menu() {
  const [open, setOpen] = React.useState(true);
  const [leagues, setLeagues] = useState([]);
  const [isAuth, setIsAuth] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {});

  const GetData = () => {
    AxiosInstance.get(`league/`).then((res) => {
      setLeagues(res.data);
    });
  };

  useEffect(() => {
    if (localStorage.getItem("access_token") !== null) {
      setIsAuth(true);
    }
    const isStaff = localStorage.getItem("is_staff") === "true";
    setIsAdmin(isStaff);
    GetData();
  }, []);

  console.log(isAdmin);

  const handleClick = () => {
    setOpen(!open);
  };

  const location = useLocation();
  const path = location.pathname;

  return (
    <>
      <List>
        <ListItemButton
          onClick={handleClick}
          component={Link}
          to="/"
          selected={path === "/"}
        >
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Все клубы" />
          {open ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>

        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {leagues.map((league) => (
              <ListItemButton
                key={league.id}
                component={Link}
                to={`/league/${league.id}`}
                sx={{ pl: 4 }}
                selected={path === `/league/${league.id}`}
              >
                <ListItemIcon>
                  <DashboardCustomizeIcon />
                </ListItemIcon>
                <ListItemText primary={league.name} />
              </ListItemButton>
            ))}
          </List>
        </Collapse>

        {isAdmin && (
          <ListItemButton
            component="div"
            onClick={() => {
              checkLoginLink(isAuth, navigate, "/create_club");
            }}
            selected={path === "/create_club"}
          >
            <ListItemIcon>
              <AddBoxIcon />
            </ListItemIcon>
            <ListItemText primary="Создать клуб" />
          </ListItemButton>
        )}

        <ListItemButton
          component="div"
          onClick={() => {
            checkLoginLink(isAuth, navigate, "/create_article");
          }}
          selected={path === "/create_article"}
        >
          <ListItemIcon>
            <CreateIcon />
          </ListItemIcon>
          <ListItemText primary="Создать статью" />
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/articles"
          selected={path === "/articles"}
        >
          <ListItemIcon>
            <ArticleIcon />
          </ListItemIcon>
          <ListItemText primary="Статьи" />
        </ListItemButton>
      </List>
    </>
  );
}
