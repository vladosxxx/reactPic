import React, { Component } from "react";
import HomeScreen from "./HomeScreen.js";
import Picture from "../components/Picture";
// import ProfileScreen from "../components/index.js";
// import SideBar from "../components/SideBar.js";
import { DrawerNavigator } from "react-navigation";
import Picture from "../components/Picture";

const HomeScreenRouter = DrawerNavigator(
    {
        Home: { screen: Picture }
    }

);
export default HomeScreenRouter;