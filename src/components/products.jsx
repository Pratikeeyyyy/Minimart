import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Products() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://ecommerce-api-ten-jade.vercel.app/api/v1/products")
      .then((res) => {
        const list = res.data?.data?.items;
        setProducts(Array.isArray(list) ? list : []);
      })
      .catch((err) => {
        console.log(err);
        setProducts([]);
      });
  }, []);

  //     let cart = JSON.parse(localStorage.getItem("cart")) || [];
  //     cart.push(item);
  //     localStorage.setItem("cart", JSON.stringify(cart));
  //     alert("product is added to cart ");

  // for adding to cart fromlocalStorage
  const addToCart = (item) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    cart.push(item);

    localStorage.setItem("cart", JSON.stringify(cart));

    console.log("your roduct added to cart ");
  };

  return (
    <div className="m-16 place-items-center">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.length > 0 ? (
          products.map((item, index) => (
            <div
              key={item.id || item._id || index}
              className="bg-white rounded-xl shadow hover:shadow-xl transition"
            >
              <img
                src={item.images?.[0] || "https://via.placeholder.com/150"}
                className="h-48 w-full object-cover cursor-pointer"
                onClick={() =>
                  navigate(`/product/${item.id || item._id}`, {
                    state: item,
                  })
                }
              />

              <div className="p-4">
                <h2 className="font-semibold text-lg">{item.name}</h2>
                <p className="text-gray-500 text-sm">{item.description}</p>
                <p className="font-bold text-pink-600 mt-2">Rs {item.price}</p>

                <button
                  onClick={() => addToCart(item)}
                  className="w-full mt-3 bg-black text-white py-2 rounded"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          // if ( {products.length > 0 ? ( products.map((item, index)))})
          // { <div
          //       key={item.id || item._id || index}
          //       className="bg-white rounded-xl shadow hover:shadow-xl transition"
          //     >
          //       <img
          //         src={item.images?.[0] || "https://via.placeholder.com/150"}
          //         className="h-48 w-full object-cover cursor-pointer"
          //         onClick={() =>
          //           navigate(`/product/${item.id || item._id}`, {
          //             state: item,
          //           })
          //         }
          //       />

          //       <div className="p-4">
          //         <h2 className="font-semibold text-lg">{item.name}</h2>
          //         <p className="text-gray-500 text-sm">{item.description}</p>
          //         <p className="font-bold text-pink-600 mt-2">Rs {item.price}</p>

          //         <button
          //           onClick={() => addToCart(item)}
          //           className="w-full mt-3 bg-black text-white py-2 rounded"
          //         >
          //           Add to Cart
          //         </button>
          //       </div>
          //     </div>
          //   ))
          // )
          // }else{
          //  <p className="col-span-full text-center text-gray-500">
          //   No products available
          // </p>
          // }
          <p className="col-span-full text-center text-gray-500">
            No products available
          </p>
        )}
      </div>
    </div>
  );
}
