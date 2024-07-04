import React from "react";
import SignIn from "../pages/SignIn";

import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View } from 'react-native';
import SignUp from "../pages/SignUp";


const Stack = createNativeStackNavigator();

function AuthRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="SignIn" component={SignIn} 
            options={{headerShown: false}}/>
            
            <Stack.Screen name="SignUp" component={SignUp}/>
        </Stack.Navigator>
    )

}

export default AuthRoutes;