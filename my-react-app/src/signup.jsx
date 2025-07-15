import { useState } from "react";
import "./sign.css";

const Sign = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    // Username
    if (!username.trim()) newErrors.username = "Username is required.";
    else if (username.length < 3) newErrors.username = "Username must be at least 3 characters.";

    // Email
    if (!email.trim()) newErrors.email = "Email is required.";
    else if (!/^\S+@\S+\.\S+$/.test(email)) newErrors.email = "Invalid email format.";
    else {
      const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
      if (existingUsers.find((u) => u.email === email)) {
        newErrors.email = "Email is already registered.";
      }
    }

    // Password
    if (!password) newErrors.password = "Password is required.";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters.";
    else if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/.test(password)) {
      newErrors.password = "Password must include upper, lower, number & symbol.";
    }

    // Phone
    if (!phone) newErrors.phone = "Phone number is required.";
    else if (!/^\d{10,15}$/.test(phone)) {
      newErrors.phone = "Phone must be 10–15 digits.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const newUser = { username, password, email, phone };

    // Save to localStorage
    const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
    existingUsers.push(newUser);
    localStorage.setItem("users", JSON.stringify(existingUsers));

    // Save to server
    try {
      const res = await fetch("http://localhost:5000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newUser),
      });

      const data = await res.json();
      console.log("Server Response:", data);

      alert(data.message || "Signup successful!");
      window.location.href = "/dash";
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Signup failed. Server error.");
    }
  };

  return (
    <div className="wrapper">
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>

        <div className="input-box">
          <label htmlFor="Name">Name :</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Full Name"
            required
          />
          {errors.username && <p className="error">{errors.username}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="Password">Password :</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          {errors.password && <p className="error">{errors.password}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="Email">Email :</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          {errors.email && <p className="error">{errors.email}</p>}
        </div>

        <div className="input-box">
          <label htmlFor="Phone">Phone :</label>
          <input
            type="text"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Phone"
            required
          />
          {errors.phone && <p className="error">{errors.phone}</p>}
        </div>

        <button className="btn" type="submit">
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default Sign;
