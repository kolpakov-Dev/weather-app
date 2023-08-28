import { useState } from "react";
import { BiSolidUserRectangle, BiShow, BiSolidShow } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { IRegData } from "../../interfaces/IRegData";
import { IRegAuthForm } from "../../interfaces/components";
import { useAppDispatch } from "../../hooks/redux";
import { createUser } from "../../store/redusers/user/ActionCreater";

const RegForm = ({ func, changeUser, authUserData }: IRegAuthForm) => {
  const [showPass, setShowPass] = useState(false);
  const [passType, changePassType] = useState("password");
  const dispatch = useAppDispatch();
  const reg = () => {
    if (
      authUserData.email !== "" &&
      authUserData.name !== "" &&
      authUserData.password !== ""
    ) {
      dispatch(createUser(authUserData));
    }
  };
  const EventShowPass = () => {
    setShowPass(!showPass);
    showPass ? changePassType("text") : changePassType("password");
  };
  const onEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = { email: event.target.value.trim() };
    changeUser((authUserData: any) => ({
      ...authUserData,
      ...newEmail,
    }));
  };
  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = { name: event.target.value.trim() };
    changeUser((authUserData: IRegData) => ({
      ...authUserData,
      ...newName,
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
      <h3>Registration:</h3>
      <div className="RegAuthBody">
        <div className="inputItem ">
          <input
            type="email"
            placeholder="Email"
            value={authUserData.email}
            onChange={onEmailChange}
          />
          <div className="svgWrap">
            {" "}
            <MdEmail />
          </div>
        </div>
        <div className="inputItem">
          <input
            type="text"
            placeholder="Name"
            value={authUserData.name}
            onChange={onNameChange}
          />
          <div className="svgWrap">
            {" "}
            <BiSolidUserRectangle />
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
        <div className="regAuthBtn" onClick={() => reg()}>
          Register
        </div>
        <span
          className="changeRegAuth"
          onClick={() => {
            func(false);
            changeUser({ password: "", name: "", email: "" });
          }}
        >
          Alredy have an account? Log in.
        </span>
      </div>
    </div>
  );
};
export default RegForm;
