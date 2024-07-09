import React from "react";
import Feather from 'react-native-vector-icons/Feather'

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from 'react-native';

import Home from "../pages/Home";
import Search from "../pages/Search";
import Profile from "../pages/Profile";
import NewPost from "../pages/NewPost";
import PostsUser from "../pages/PostsUser";
import CancelButton from "../components/CancelButton";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function StackScreen() {
    return(
        <Stack.Navigator>
            <Stack.Screen 
            name="Home" 
            component={Home} 
            options={{headerShown: false}}/>

            <Stack.Screen 
            name="NewPost" 
            component={NewPost} 
            options={{
                headerTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#36393f'
                },
                headerTitle: '',
                headerLeft: () => <CancelButton/>
            }}
            />

            <Stack.Screen 
            name="PostsUser" 
            component={PostsUser}/>
        </Stack.Navigator>
    );
}

function AppRoutes() {
    return(
        <Tab.Navigator
        screenOptions={{
            tabBarHideOnKeyboard: true,
            tabBarShowLabel: false,
            tabBarStyle:{
                backgroundColor: '#202225',
                borderTopWidth: .3,
                borderTopColor: 'gray'
            },
            headerShown: false,

            tabBarActiveTintColor: '#fff'
        }}
        
        >
            <Tab.Screen 
            name="Home" 
            component={StackScreen}
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