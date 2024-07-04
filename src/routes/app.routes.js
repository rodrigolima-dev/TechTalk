import React from "react";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from 'react-native';

import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

function AppRoutes() {
    return(
        <Tab.Navigator>
            <Tab.Screen name="Home" component={Home}/>
            <Tab.Screen name="Search" component={Search}/>
            <Tab.Screen name="Profile" component={Profile}/>
        </Tab.Navigator>
    );
}

export default AppRoutes;