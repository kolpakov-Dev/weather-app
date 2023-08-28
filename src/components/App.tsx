import React, { useEffect } from "react";
import "./../assets/css/reset.css";
import "./../assets/css/main.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Profile from "./Profile/Profile";
import { Header } from "./Header";
import { fetchCities } from "../store/redusers/cities/ActionCreater";
import { getUser } from "../store/redusers/user/ActionCreater";
import { useAppDispatch, useAppSelector } from "../hooks/redux";
function App() {
  const { user } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getUser(""));
  }, []);
  useEffect(() => {
    dispatch(fetchCities(""));
  }, [user]);
  return (
    <div className="container">
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
}

export default App;
