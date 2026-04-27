import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { observer } from "mobx-react-lite";
import Cookies from "js-cookie";
import { loginStore } from "./loginStore";
import "./index.css";
import { getJwtToken } from "../../utils/cookiesUtils";


const LoginForm = observer(() => {
  const jwtToken = getJwtToken()
  const navigate = useNavigate();

  if (jwtToken) {
    return <Navigate to="/" replace />;
  }

  const onSubmitForm = async (e) => {
    e.preventDefault();
    const result = await loginStore.login();
    if (result && result.success) {
      navigate("/", { replace: true });
    }
  };

  const renderPasswordField = () => (
    <>
      <label className="input-label" htmlFor="password">
        PASSWORD
      </label>
      <input
        type={loginStore.showPassword ? "text" : "password"}
        id="password"
        className="input"
        value={loginStore.password}
        onChange={(e) => loginStore.setPassword(e.target.value)}
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
        value={loginStore.username}
        onChange={(e) => loginStore.setUsername(e.target.value)}
        placeholder="Username"
      />
    </>
  );

  const CheckBoxField = () => (
    <div className="checkbox-group">
      <input 
        type="checkbox" 
        checked={loginStore.showPassword} 
        id="showPassword" 
        onChange={loginStore.togglePassword} 
      />
      <label htmlFor="showPassword">Show Password</label>
    </div>
  )

  const renderLogo = () => (
    <div className="logo-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
        className="login-logo"
        alt="website logo"
      />
    </div>
  )

  const renderLoginButton = () => (
    <button type="submit" className="login-btn">
      Login
    </button>
  )

  return (
    <div className="login-bg">
      
      <form className="login-card" onSubmit={onSubmitForm}>
        {renderLogo()}
        <div className="input-group">
          {renderUsernameField()}
        </div>

        <div className="input-group">
          {renderPasswordField()}
        </div>

        <CheckBoxField />

        {renderLoginButton()}

        {loginStore.error && <p className="error-msg">*{loginStore.error}</p>}
        
      </form>
    </div>
  );
});

export default LoginForm;