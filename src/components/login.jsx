import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    //paila ko login code
    //   const login = async () => {
    //     try {
    //       const res = await axios.post(
    //         "https://ecommerce-api-ten-jade.vercel.app/api/v1/auth/login",
    //         { email, password }
    //       );

    //       localStorage.setItem("token", res.data.accessToken);
    //       navigate("/");
    //     } catch (err) {
    //       alert("Login failed");
    //     }
    //   };
    try {
      const res = await axios.post(
        "https://ecommerce-api-ten-jade.vercel.app/api/v1/auth/login",
        {
          email,
          password,
        },
      );

      console.log("ths is responce of login", res.data);

      const token = res.data?.data?.accessToken;

      if (token) {
        localStorage.setItem("token", token);
      }

      alert("Login successful !!");

      navigate("/");
    } catch (err) {
      console.log("your login failed", err.response?.data);

      alert(err.response?.data?.error?.message || "Login failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Login</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Login
        </button>
      </form>
    </div>
  );
}
