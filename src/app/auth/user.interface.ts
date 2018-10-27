import { auth } from "firebase";

export interface User {
    uuid: string;
    email: string;
    displayName: string;
    photoURL: string;
    isKurs: boolean;
    //userCred: auth.UserCredential;
}