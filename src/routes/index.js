import React from "react";
import AppRoutes from "./app.routes";
import AuthRoutes from "./auth.routes";

import { ActivityIndicator, View } from 'react-native';

function Routes() {
    const signed = false;
    const loading = false;

    if(loading) {
        return(
            <View style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: '#36393f'
            }}
            >
                <ActivityIndicator size={50} color="#28A745"/>
            </View>

        )
    }


    return(
        signed ? <AppRoutes/> : <AuthRoutes/>
    );
}


export default Routes;