import { useState } from "react";
import { BiShow, BiSolidShow } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IRegAuthForm } from "../../interfaces/components";
import { IRegData } from "../../interfaces/IRegData";
import { useAppDispatch } from "../../hooks/redux";
import { logIn } from "../../store/redusers/user/ActionCreater";
import { fetchCities } from "../../store/redusers/cities/ActionCreater";
const AuthForm = ({ func, changeUser, authUserData }: IRegAuthForm) => {
  const [showPass, setShowPass] = useState(false);
  const [passType, changePassType] = useState("password");
  const dispatch = useAppDispatch();
  const auth = () => {
    if (authUserData.email !== "" && authUserData.password !== "") {
      dispatch(logIn(authUserData));
      dispatch(fetchCities(""));
    }
  };
  const EventShowPass = () => {
    setShowPass(!showPass);
    showPass ? changePassType("text") : changePassType("password");
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = { email: event.target.value };
    changeUser((authUserData: IRegData) => ({
      ...authUserData,
      ...newEmail,
    }));
  };
  const onPassChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPass = { password: event.target.value };
    changeUser((authUserData: IRegData) => ({
      ...authUserData,
      ...newPass,
    }));
  };
  return (
    <div className="AuthReg">
      <h3>Log in:</h3>
      <div className="RegAuthBody">
        <div className="inputItem">
          <input
            type="email"
            placeholder="Email"
            value={authUserData.email}
            onChange={onEmailChange}
          />
          <div className="svgWrap">
            <MdEmail />
          </div>
        </div>
        <div className="inputItem">
          <input
            type={passType}
            placeholder="Password"
            value={authUserData.password}
            onChange={onPassChange}
          />
          <div className="svgWrap">
            {!showPass ? (
              <BiShow onClick={EventShowPass} />
            ) : (
              <BiSolidShow onClick={EventShowPass} />
            )}
          </div>
        </div>

        <div className="regAuthBtn" onClick={() => auth()}>
          Log in
        </div>
        <span
          className="changeRegAuth"
          onClick={() => {
            func(true);
            changeUser({ password: "", name: "", email: "" });
          }}
        >
          Don't have an account? Sign up.
        </span>
      </div>
    </div>
  );
};
export default AuthForm;
