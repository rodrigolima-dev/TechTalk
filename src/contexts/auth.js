import React, { createContext, useEffect, useState } from "react";
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from "@react-native-community/async-storage";

export const AuthContext = createContext({})

export default function AuthProvider({children}) {
    const [user,setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)


    useEffect(() => {
        async function loadStorage() {
            const storageUser = await AsyncStorage.getItem('devapp');

            if(storageUser) {
                setUser(JSON.parse(storageUser))
                setLoading(false)
            }

            setLoading(false)
        }

        loadStorage();
    },[])

    async function signUp(email, password, name) {
        setLoadingAuth(true)

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
                storageUser(data)
                setLoadingAuth(false)
            })
        }) 
        .catch((error) => {
            console.log(error)
        })
    }

    async function signIn(email, password) {
        setLoadingAuth(true)

        await auth().signInWithEmailAndPassword(email, password)
        .then( async (value) => {
            let uid = value.user.uid;
            //Buscar o nome do usuário logado
            const userProfile = await firestore().collection('users').doc(uid)
            .get()

            console.log(userProfile.data().name)
            let data = {
                uid: uid,
                name: userProfile.data().name,
                email: value.user.email
            };

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
        })
    }

    async function signOut() {
        await auth().signOut();
        await AsyncStorage.clear()
        .then(() => {
            setUser(null)
        })
    }

    async function storageUser(data) {
        await AsyncStorage.setItem('devapp', JSON.stringify(data))
    }    



    return(
        <AuthContext.Provider value={{signed: !!user, user, signIn, signUp, 
        loadingAuth, loading, signOut}}>
            {children}
        </AuthContext.Provider>

    );
}