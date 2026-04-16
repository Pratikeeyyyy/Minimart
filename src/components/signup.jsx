import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://ecommerce-api-ten-jade.vercel.app/api/v1/auth/signup",
        formData,
      );

      console.log("SUCCESS ", res.data);

      // storeing token token
      const token = res.data?.data?.accessToken;
      if (token) {
        localStorage.setItem("token", token);
      }

      alert("Signup successful!");

      // go to home or login
      navigate("/");
    } catch (err) {
      const message = err.response?.data?.error?.message || "Signup failed";

      console.log("Errorr", err.response?.data);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-center">Create Account</h2>

        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 border mb-3 rounded"
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password (min 8 chars)"
          onChange={handleChange}
          className="w-full p-2 border mb-4 rounded"
          required
        />

        <button
          type="submit"
          className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
