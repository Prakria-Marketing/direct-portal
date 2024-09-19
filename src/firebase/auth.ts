import { auth } from "./firebase";
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    sendPasswordResetEmail,
    sendEmailVerification,
    updatePassword,
    signInWithPopup,
    GoogleAuthProvider,
} from "firebase/auth";

// register user
export const doCreateUserWithEmailAndPassword = async (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth, email, password);
};
// for login user
export const doSignInWithEmailAndPassword = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password);
};
// auth with google
export const doSignInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    return user;

    // add user to firestore
};
// signout
export const doSignOut = () => {
    return auth.signOut();
};

export const doPasswordReset = (email: string) => {
    return sendPasswordResetEmail(auth, email);
};

export const doPasswordChange = (password: string) => {
    return updatePassword(auth.currentUser!, password);
};

export const doSendEmailVerification = () => {
    return sendEmailVerification(auth.currentUser!, {
        url: `${window.location.origin}/`,
    });
};
