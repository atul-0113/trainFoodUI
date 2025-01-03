import { useState } from "react";
import "./Login.css"; // import styles for the login component
import { BASE_URL } from "../../Configs/config";

const Login = ({ updateToken, toggleForm, isRegister }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [formErrors, setFormErrors] = useState({});

  const handleSubmit = async(e) => {
    e.preventDefault();

    // Validate inputs
    const errors = {};

    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";

    setFormErrors(errors);

    if (Object.keys(errors).length === 0) {
      // Handle login or registration here (call API for login/registration)
      console.log(isRegister ? "Registered with" : "Logged in with", { username, password });
      isRegister ? await registerUser() : await loginUser()
    }
  };
  const registerUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data,"Data")
      if(data && data.access_token){
        localStorage.setItem("authToken", data.access_token);
        updateToken(data.access_token)
      }
      return data;
    } catch (error) {
      console.error("Error during registration:", error);
      return { success: false, message: "Registration failed. Please try again." };
    }
  };

  const loginUser = async () => {
    try {
      const response = await fetch(`${BASE_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });

      const data = await response.json();
      console.log(data,"Data")
      if(data && data.access_token){
        localStorage.setItem("authToken", data.access_token);

        updateToken(data.access_token, data.user)
      }
      return data;
    } catch (error) {
      console.error("Error during login:", error);
      return { success: false, message: "Login failed. Please try again." };
    }
  };

  return (
    <div className="login-container">
      <h2>{isRegister ? "Register" : "Login"}</h2>
      <form onSubmit={handleSubmit} className="form">
        <div className="input-group">
          <label>Username</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className={`input ${formErrors.username ? "error" : ""}`}
          />
         
        </div>
        {formErrors.username && <span className="error-message">{formErrors.username}</span>}
        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={`input ${formErrors.password ? "error" : ""}`}
          />
        </div>
        
        {formErrors.password && <span className="error-message">{formErrors.password}</span>}
        <button type="submit" className="submit-btn">
          {isRegister ? "Register" : "Login"}
        </button>
      </form>

      {!isRegister ? (
        <p>
          Don't have an account?{" "}
          <span onClick={toggleForm} className="link">
            Register here
          </span>
        </p>
      ) : (
        <p>
          Already have an account?{" "}
          <span onClick={toggleForm} className="link">
            Login here
          </span>
        </p>
      )}
    </div>
  );
};

export default Login;
