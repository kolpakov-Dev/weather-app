import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth } from "../../../firebase-setup/firebase";
import { IUser } from "../../../interfaces/IUser";
import {
  convertFirebaseError,
  createUserFunc,
  loginFunc,
  userGet,
} from "../../../models/User";
import { signOut } from "firebase/auth";
export const getUser = createAsyncThunk(
  "user/getUser",
  async (_: any, thunkApi) => {
    try {
      return await userGet();
    } catch (error: any) {
      return thunkApi.rejectWithValue(convertFirebaseError(error.code));
    }
  }
);
export const signOutFunc = createAsyncThunk(
  "user/signOut",
  async (_: any, thunkApi) => {
    try {
      await signOut(auth);
      return true;
    } catch (error: any) {
      return thunkApi.rejectWithValue(convertFirebaseError(error.code));
    }
  }
);
export const logIn = createAsyncThunk(
  "user/logIn",
  async (_: any, thunkApi) => {
    try {
      return (await loginFunc(_.email, _.password)) as IUser;
    } catch (error: any) {
      return thunkApi.rejectWithValue(convertFirebaseError(error.code));
    }
  }
);
export const createUser = createAsyncThunk(
  "user/createUser",
  async (_: any, thunkApi) => {
    try {
      return (await createUserFunc(_.name, _.email, _.password)) as IUser;
    } catch (error: any) {
      return thunkApi.rejectWithValue(convertFirebaseError(error.code));
    }
  }
);
