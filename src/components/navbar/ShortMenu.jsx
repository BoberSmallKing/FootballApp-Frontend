import * as React from "react";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import CreateIcon from "@mui/icons-material/Create";
import { Link, useLocation, useNavigate } from "react-router";
import checkLoginLink from "../../SimpleFunctions";
export default function ShortMenu() {
  const location = useLocation();
  const path = location.pathname;
  const navigate = useNavigate();

  const isAuth = localStorage.getItem("access_token") !== null;

  return (
    <>
      <List
        sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        component="nav"
        aria-labelledby="nested-list-subheader"
      >
        <ListItemButton
          component={Link}
          to="/"
          selected={path === "/"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <DashboardIcon />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton
          component="div"
          onClick={() => {
            checkLoginLink(isAuth, navigate, "/create_club");
          }}
          selected={path === "/create_club"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <AddBoxIcon />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton
          component="div"
          onClick={() => {
            checkLoginLink(isAuth, navigate, "/create_article");
          }}
          selected={path === "/create_article"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <CreateIcon />
          </ListItemIcon>
        </ListItemButton>

        <ListItemButton
          component={Link}
          to="/articles"
          selected={path === "/articles"}
          sx={{ display: "flex", justifyContent: "center" }}
        >
          <ListItemIcon sx={{ display: "flex", justifyContent: "center" }}>
            <ArticleIcon />
          </ListItemIcon>
        </ListItemButton>
      </List>
    </>
  );
}
