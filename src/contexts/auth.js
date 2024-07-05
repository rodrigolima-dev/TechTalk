import React, { createContext, useState } from "react";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

export const AuthContext = createContext({})

export default function AuthProvider({children}) {
    const [user,setUser] = useState(null)

    async function signUp(email, password, name) {
        await auth().createUserWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            await firestore().collection('users')
            .doc(uid).set({
                name: name,
            })
            .then( () => {
                let data = {
                    uid: uid,
                    name: name,
                    email: value.user.email
                }
                setUser(data)
            })
        }) 
        .catch((error) => {
            console.log(error)
        })
    }



    return(
        <AuthContext.Provider value={{signed: !!user, user, signUp}}>
            {children}
        </AuthContext.Provider>

    );
}