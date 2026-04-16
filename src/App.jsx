import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/login.jsx";
import Signup from "./components/signup.jsx";
import Products from "./components/products.jsx";
import Cart from "./components/cart.jsx";
import Navbar from "./components/navbar.jsx";
import { ProtectedRoute } from "./rote/routeguard.jsx";
import ProductDetails from "./components/prooductdetails.jsx";
export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </BrowserRouter>
  );
}
