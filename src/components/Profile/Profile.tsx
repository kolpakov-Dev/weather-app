import { useEffect, useState } from "react";
import RegForm from "./regForm";
import AuthForm from "./authForm";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { CitiesSlice } from "../../store/redusers/cities/CitiesSlice";
import { FiDelete } from "react-icons/fi";
import { signOutFunc } from "../../store/redusers/user/ActionCreater";
import { addCity, removeCity } from "../../store/redusers/cities/ActionCreater";
import { getCurrentWeather } from "../../store/redusers/weather/ActionCreater";
function Profile() {
  const user = useAppSelector((state) => state.userReducer).user;
  const userError = useAppSelector((state) => state.userReducer).error;
  const userLoading = useAppSelector((state) => state.userReducer).loading;
  const citiesArr = useAppSelector((state) => state.citiesReducer).cities;
  const citiesError = useAppSelector((state) => state.citiesReducer).error;
  const { cleanCitiesArr } = CitiesSlice.actions;
  const [regAuthFlag, changeRegAuthFlag] = useState(false);
  const [addNewCityValue, changeNewCityValue] = useState("");
  const { cleanError } = CitiesSlice.actions;
  const [regUserData, setRegUserData] = useState(() => {
    return {
      email: "",
      name: "",
      password: "",
    };
  });
  useEffect(() => {
    dispatch(cleanError());
  }, []);

  const addNewCityEvent = () => {
    if (!addNewCityValue) {
      return;
    }
    dispatch(addCity({ city: addNewCityValue }));
    changeNewCityValue("");
  };
  const dispatch = useAppDispatch();
  return (
    <div className="wrapper">
      {userError ? <div className="error popUp">{userError}</div> : <></>}
      {userLoading ? (
        <div className="Loading popUp"> LOADING!!!!!!</div>
      ) : (
        <></>
      )}
      <div className="Profile mainBlock">
        {user ? (
          <>
            <div className="left">
              <div className="left_body">
                <div className="left_body_text">
                  <h2 className="temperature">Hello</h2>
                </div>
              </div>
              <p>{user.name}</p>
              <p>Email: {user.email}</p>
            </div>
            <div className="right">
              <div className="right_content">
                <div className="content_left">
                  <h3>List of cities to track:</h3>
                  <div className="cityList">
                    {citiesArr.length ? (
                      citiesArr.map((elem) => {
                        return (
                          <div
                            className="cityItem"
                            onClick={() => dispatch(removeCity({ city: elem }))}
                          >
                            <p>{elem}</p>
                            <FiDelete />
                          </div>
                        );
                      })
                    ) : (
                      <p>You dont have saved cities</p>
                    )}
                  </div>
                </div>
                <div className="content_right">
                  <h3>Add new City:</h3>
                  {citiesError ? (
                    <p style={{ color: "red" }}>{citiesError}</p>
                  ) : (
                    <></>
                  )}
                  <div className="input_group">
                    <input
                      type="text"
                      placeholder="write a city"
                      value={addNewCityValue}
                      onChange={(event) =>
                        changeNewCityValue(event.target.value)
                      }
                    />
                    <div
                      className="btn"
                      onClick={() => {
                        addNewCityEvent();
                        dispatch(getCurrentWeather({ city: addNewCityValue }));
                      }}
                    >
                      Add
                    </div>
                  </div>
                </div>
              </div>
              <div
                className="btn"
                onClick={() => {
                  dispatch(signOutFunc(""));
                  dispatch(cleanCitiesArr());
                  setRegUserData({ password: "", name: "", email: "" });
                }}
              >
                Sign out
              </div>
            </div>
          </>
        ) : !regAuthFlag ? (
          <AuthForm
            func={changeRegAuthFlag}
            changeUser={setRegUserData}
            authUserData={regUserData}
          />
        ) : (
          <RegForm
            func={changeRegAuthFlag}
            changeUser={setRegUserData}
            authUserData={regUserData}
          />
        )}
      </div>
    </div>
  );
}
export default Profile;
