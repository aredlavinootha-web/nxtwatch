import { useState } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import Cookies from "js-cookie";
import { loginStore } from "./loginStore";
import "./index.css";


const LoginForm = () => {
  const jwtToken = Cookies.get("jwt_token");

  if (jwtToken) {
    return <Navigate to="/" replace />;
  }

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

  return (
    <div className="login-bg">
      <form className="login-card" onSubmit={loginStore.login}>
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

        <CheckBoxField />

        <button type="submit" className="login-btn">
          Login
        </button>

        {error && <p className="error-msg">*{loginStore.error}</p>}
        
      </form>
    </div>
  );
};

export default LoginForm;