import React, { createContext } from "react";

import { View } from 'react-native';


export const AuthContext = createContext({})

export default function AuthProvider({children}) {
    return(
        <AuthContext.Provider value={{signed: true}}>
            {children}
        </AuthContext.Provider>

    );
}