import firebase from "firebase/compat/app";
import 'firebase/compat/firestore';
import { getAuth, signInWithPopup, GoogleAuthProvider, reauthenticateWithPopup } from "firebase/auth";
import { getListFromDocs, setToken } from "../utils";
import config from "../config";

if (firebase.apps.length === 0){
    firebase.initializeApp(config.FIREBASE_CONFIG)
}

const provider = new GoogleAuthProvider();
const auth = getAuth();

export const getUser = () => auth.currentUser;

export const addDocument = async (collection: string, data: any) => {
    return await firebase.firestore().collection(collection).add(data)
}

export const setDocument = async (collection: string, id: string, data: any) => {
    return await firebase.firestore().collection(collection).doc(id).set(data)
}

export const updateDocument = async (collection: string, id: string, data: any) => {
    return await firebase.firestore().collection(collection).doc(id).update(data)
}

export const getDocument = async (collection: string, id: string) => {
    return await firebase.firestore().collection(collection).doc(id).get()
    .then((doc: any) => doc.data())
}

export const deleteDocument = async (collection: string, id: string) => {
    return await firebase.firestore().collection(collection).doc(id).delete()
}

export const findDocuments = async (collection: string, key: string, value: any, raw: boolean = false) => {
    return await firebase.firestore().collection(collection).where(key, "==", value).get()
    .then((data: any) => raw? data : getListFromDocs(data))
}

export const onGoogleLogin = async (callback: any = null) => {
    return await signInWithPopup(auth, provider)
    .then(async (result: any) => {
        const { displayName, accessToken, photoURL }: any = result.user;

        localStorage.setItem("spacebit_token", accessToken)
        localStorage.setItem("spacebit_user_name", displayName)
        localStorage.setItem("spacebit_user_avatar", photoURL)
        setToken(accessToken);
        
        if(callback) callback()
    })
    .catch((error) => { console.error("Googe login error: ", error)});
}

export const getToken = async ():Promise<string|null> => {
    const auth = getAuth();
    const user: any = auth.currentUser;
    return user ? await user.getIdToken() : null
}