import { useState } from "react";
import "./LoginPage.css";

export const LoginPage = ({ handleLogIn }) => {
  const [userName, setUserName] = useState("");
  const [userPass, setUserPass] = useState("");

  const handleUserNameChange = (e) => {
    setUserName(e.target.value);
  };

  const handleUserPassChange = (e) => {
    setUserPass(e.target.value);
  };

  const onLoginIn = () => {
    localStorage.setItem("userName", userName);
    handleLogIn();
  };

  return (
    <div className="loginForm" onSubmit={onLoginIn}>
      <h1>Log the fuck in</h1>
      <form>
        <div>
          <input
            type="text"
            placeholder="Введите логин"
            value={userName}
            onChange={handleUserNameChange}
            required
          />
        </div>
        <div>
          <input
            type="password"
            placeholder="Введите пароль"
            value={userPass}
            onChange={handleUserPassChange}
            required
          />
        </div>
        <div>
          <button className="blackBtn" type="submit">
            Log in
          </button>
        </div>
      </form>
    </div>
  );
};
