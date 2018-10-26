import { auth } from "firebase";

export interface User {
    uuid: string;
    email: string;
    displayName: string;
    photoURL: string;
    isStudio: boolean;
    userCred: auth.UserCredential;
}