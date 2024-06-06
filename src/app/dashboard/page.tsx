"use client";
import React, { useEffect, useState } from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import CssBaseline from "@mui/material/CssBaseline";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import AddIcon from "@mui/icons-material/Add";
import DataGridDemo from "./datagrid";
import FormComponent from "./form";
import axios from "axios";
import Authlayout from "../authlayout/page";

const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginRight: -drawerWidth,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: 0,
  }),
  position: "relative",
}));

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginRight: drawerWidth,
  }),
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
  justifyContent: "flex-start",
}));

interface User {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

export default function PersistentDrawerRight() {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState<User>({
    id: "",
    firstName: "",
    lastName: "",
    createdAt: new Date().toISOString().split("T")[0],
  });
  const [addOrEdit, setAddOrEdit] = useState(false);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          "https://660a54c30f324a9a2884ab85.mockapi.io/users"
        );
        setUsers(response.data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };

    fetchUsers();
  }, []);

  const deleteUser = async (id: string) => {
    try {
      await axios.delete(
        `https://660a54c30f324a9a2884ab85.mockapi.io/users/${id}`
      );
      setUsers(users.filter((user) => user.id !== id)); 
    } catch (error) {
      console.error("Failed to delete user:", error);
    }
  };
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleAddClick = () => {
    setUserData({ id: "", firstName: "", lastName: "", createdAt: "" });
    setShowForm(true);
    setAddOrEdit(true);
  };
  const handleUserAdded = (newUser: User) => {
    setUsers([...users, newUser]);
    setOpen(false);
  };

  const handleEdit = (id: string) => {
    console.log(`Editing row with id ${id}`);

    const user = users.find((user) => user.id === id);

    if (user) {
      setUserId(id);
      setUserData({ ...user });
      setShowForm(true);
      setOpen(true);
      setAddOrEdit(false);
    }
  };

  const handleDelete = (id: string) => {
    console.log(`Deleting row with id ${id}`);
    if (confirm("Do you want to delete?")) deleteUser(id);
  };
  const handleUserUpdated = (updatedUser: User) => {
    setUsers(
      users.map((user) => (user.id === updatedUser.id ? updatedUser : user))
    );
    setOpen(false);
    setShowForm(false);
  };
  return (
    <Authlayout>
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }} component="div">
            Employee Table
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            sx={{ ...(open && { display: "none" }) }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Main open={open}>
        <DrawerHeader />
        <DataGridDemo
          rows={users}
          handleEdit={handleEdit}
          handleDelete={handleDelete}
        />
      </Main>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
          },
        }}
        variant="persistent"
        anchor="right"
        open={open}
      >
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronLeftIcon />
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={handleAddClick}>
              <ListItemIcon>{<AddIcon />}</ListItemIcon>
              <ListItemText primary={"ADD"} />
            </ListItemButton>
          </ListItem>
        </List>
        {showForm &&
          (addOrEdit ? (
            <FormComponent
              onUserAdded={handleUserAdded}
              userData={userData}
              action="add"
            />
          ) : (
            <FormComponent
              onUserUpdated={handleUserUpdated}
              userData={userData}
              action="edit"
              userId={userId}
            />
          ))}
      </Drawer>
    </Box>
    </Authlayout>
  );
}
