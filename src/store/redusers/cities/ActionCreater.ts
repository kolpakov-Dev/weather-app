import { createAsyncThunk } from "@reduxjs/toolkit";
import { auth, firestore } from "../../../firebase-setup/firebase";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  query,
  where,
} from "@firebase/firestore";
import { convertWeatherError, getWetherByCity } from "../../../models/Weather";
export const addCity = createAsyncThunk(
  "cities/addCity",
  async (_: any, thunkApi) => {
    const currentUser = auth.currentUser;
    const ref = collection(firestore, "Cities"); // Firebase creates this automatically
    let data = {
      city: _.city,
      userID: currentUser?.uid,
    };
    try {
      await getWetherByCity(_.city);
      addDoc(ref, data);
      return _.city;
    } catch (err: any) {
      return thunkApi.rejectWithValue(convertWeatherError(err.code));
    }
  }
);
export const removeCity = createAsyncThunk(
  "cities/removeCity",
  async (_: any, thunkApi) => {
    const currentUser = auth.currentUser;
    try {
      const q = query(
        collection(firestore, "Cities"),
        where("city", "==", _.city),
        where("userID", "==", currentUser!.uid)
      );
      const querySnapshot = await getDocs(q);
      const docID = querySnapshot.docs[0].id;
      await deleteDoc(doc(firestore, "Cities", docID));
      return _.city;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.code);
    }
  }
);
export const fetchCities = createAsyncThunk(
  "cities/fetchFavorites",
  async (_: any, thunkApi) => {
    let resArr: string[];
    const currentUser = auth.currentUser;
    try {
      const q = query(
        collection(firestore, "Cities"),
        where("userID", "==", currentUser?.uid)
      );
      const ref = await getDocs(q);
      resArr = ref.docs.map((element) => {
        return element.data().city;
      });
      return resArr;
    } catch (err: any) {
      return thunkApi.rejectWithValue(err.code);
    }
  }
);
