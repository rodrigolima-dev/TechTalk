import React from "react";
import Feather from 'react-native-vector-icons/Feather'

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { View } from 'react-native';

import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";

const Tab = createBottomTabNavigator();

function AppRoutes() {
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarStyle:{
                backgroundColor: '#202225',
                borderTopWidth: 0
            },

            tabBarActiveTintColor: '#fff'
        }}
        
        >
            <Tab.Screen 
            name="Home" 
            component={Home}
            options={{
                tabBarIcon: ({color, size}) => {
                    return <Feather name="home" color={color} size={size}/>
                }
            }}
            />

            <Tab.Screen 
            name="Search" 
            component={Search}
            options={{
                tabBarIcon: ({color, size}) => {
                    return <Feather name="search" color={color} size={size}/>
                }
            }}
            />

            <Tab.Screen 
            name="Profile" 
            component={Profile}
            options={{
                tabBarIcon: ({color, size}) => {
                    return <Feather name="user" color={color} size={size}/>
                }
            }}
            />

        </Tab.Navigator>

    );
}

export default AppRoutes;