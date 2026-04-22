import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";

import "./index.css";

const LoginForm = () => {
  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken) {
    return <Navigate to="/" replace />;
  }

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const onChangeUsername = (event) => {
    setUsername(event.target.value);
  };

  const onChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const togglePassword = () => {
    setShowPassword(prev => !prev);
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type={showPassword ? "text" : "password"}
        id="password"
        className="input"
        value={password}
        onChange={onChangePassword}
        placeholder="Password"
      />
    </>
  );

  const renderUsernameField = () => (
    <>
      <label className="input-label" htmlFor="username">
        USERNAME
      </label>
      <input
        type="text"
        id="username"
        className="input"
        value={username}
        onChange={onChangeUsername}
        placeholder="Username"
      />
    </>
  );

  const CheckBoxField = ({ showPassword, togglePassword }) => (
    <div className="checkbox-group">
          <input 
            type="checkbox" 
            checked={showPassword} 
            id="showPassword" 
            onChange={togglePassword} 
          />
          <label htmlFor="showPassword">Show Password</label>
        </div>
  )

  const onSubmitSuccess = (jwtToken) => {
    Cookies.set("jwt_token", jwtToken, { expires: 30 });
    navigate("/", { replace: true });
  };

  const onSubmitFailure = (errorMsg) => {
    setError(errorMsg);
  };

  const submitForm = async (event) => {
    event.preventDefault();
    const userDetails = { username, password };
    const url = "https://apis.ccbp.in/login";
    const options = {
      method: "POST",
      body: JSON.stringify(userDetails),
    };
    const response = await fetch(url, options);
    const data = await response.json();
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token);
    }
    else {
      onSubmitFailure(data.error_msg);
    }
  };

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={submitForm}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          className="login-logo"
          alt="website logo"
        />

        <div className="input-group">
          {renderUsernameField()}
        </div>

        <div className="input-group">
          {renderPasswordField()}
        </div>

        <CheckBoxField 
          showPassword={showPassword}
          togglePassword={togglePassword} 
        />

        <button type="submit" className="login-btn">
          Login
        </button>

        {error && <p className="error-msg">*{error}</p>}
        
      </form>
    </div>
  );
};

export default LoginForm;