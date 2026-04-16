import { useLocation, useParams, useNavigate } from "react-router-dom";

export default function ProductDetails() {
  const { state } = useLocation();
  const { id } = useParams();
  const navigate = useNavigate();

  const product = state;
  if (!product) {
    return (
      <div className="p-10 text-center">
        <h2 className="text-xl font-bold">No Product Data Found</h2>
        <button
          onClick={() => navigate("/")}
          className="mt-4 bg-black text-white px-4 py-2 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-white rounded-xl shadow-lg max-w-3xl w-full p-6 grid md:grid-cols-2 gap-6">
        {/* IMAGE */}
        <img
          src={product.images || "https://placehold.co/400"}
          className="w-full h-80 object-cover rounded-lg"
        />

        {/* DETAILS */}
        <div>
          <h1 className="text-2xl font-bold">{product.name}</h1>

          <p className="text-gray-600 mt-2">
            {product.description || "No description available"}
          </p>

          <p className="text-pink-600 font-bold text-xl mt-4">
            Rs {product.price}
          </p>

          <button
            onClick={() => {
              let cart = JSON.parse(localStorage.getItem("cart")) || [];
              cart.push(product);
              localStorage.setItem("cart", JSON.stringify(cart));
              alert("Added to cart 🛒");
            }}
            className="mt-6 w-full bg-black text-white py-2 rounded"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
