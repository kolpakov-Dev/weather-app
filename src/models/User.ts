import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { IUser } from "../interfaces/IUser";
import { auth } from "../firebase-setup/firebase";
export const createUserFunc = async (
  name: string,
  email: string,
  password: string
) => {
  if (name !== "" && email !== "" && password !== "") {
    const createUserEvent = createUserWithEmailAndPassword(
      auth,
      email,
      password
    ).then((userCredential) => {
      return userCredential.user;
    });
    const currUser = await createUserEvent;
    const updateUserName = updateProfile(currUser, {
      displayName: name,
    }).then(() => {
      return {
        name: currUser.displayName,
        email: currUser.email,
        id: currUser.uid,
      } as IUser;
    });
    return updateUserName;
  }
};
export const loginFunc = async (email: string, password: string) => {
  try {
    const logInPromise = signInWithEmailAndPassword(auth, email, password).then(
      (userCredential) => {
        const newUser = userCredential.user;
        if (newUser) {
          return {
            name: newUser.displayName,
            email: newUser.email,
            id: newUser.uid,
          } as IUser;
        }
        return null;
      }
    );
    return logInPromise;
  } catch (e: any) {
    console.log(`SignIn Error:${e.message}`);
    return null;
  }
};
export const userGet = (): Promise<IUser | null> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (auth.currentUser) {
        resolve({
          name: auth.currentUser?.displayName,
          email: auth.currentUser?.email,
          id: auth.currentUser?.uid,
          password: "",
        } as IUser);
      } else {
        resolve(null);
      }
    }, 1000);
  });
};
export const convertFirebaseError = (error: string) => {
  switch (error) {
    case "auth/weak-password":
      return "Password is too short.";
    case "auth/invalid-email":
      return "Invalid email.";
    case "auth/wrong-password":
      return "Wrong password.";
    case "auth/email-already-in-use":
      return "Email already in use.";
    default:
      return error;
  }
};
