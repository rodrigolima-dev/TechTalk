import React from "react";
import Login from "../pages/Login";

import { createNativeStackNavigator } from "@react-navigation/native-stack";



const Stack = createNativeStackNavigator();

function AuthRoutes() {
    return(
        <Stack.Navigator>
            <Stack.Screen name="Login" component={Login} 
            options={{headerShown: false}}/>
        </Stack.Navigator>
    )

}

export default AuthRoutes;