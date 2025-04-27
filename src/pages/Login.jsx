import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
  
    try {
      const response = await fetch("http://localhost:8080/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
      console.log(data);
  
      if (response.ok) {
        alert("Login Successful");
  
        // 🛠 Save token directly
        localStorage.setItem("token", data.token);
        localStorage.setItem("businessId", data.businessId); // (optional)
  
        navigate("/home");
      } else {
        alert(data.message || "Invalid Credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      alert("Something went wrong. Please try again.");
    }
  };
  

  return (
    <div className="form-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          autoComplete="email" // Added autocomplete for email
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          autoComplete="current-password" // Added autocomplete for password
        />
        <button type="submit">Login</button>
      </form>
      <p>
        Don’t have an account?{" "}
        <Link to="/register" style={{ color: "blue" }}>
          Register
        </Link>
      </p>
    </div>
  );
};

export default Login;
