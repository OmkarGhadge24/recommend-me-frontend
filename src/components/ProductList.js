import React, { useContext } from "react";
import Loader from "./Loader";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { ThemeContext } from "../App";

const ProductList = ({
  products = [],
  formatPrice,
  favorites = [],
  setFavorites,
}) => {
  const [user] = useAuthState(auth);
  const { theme } = useContext(ThemeContext);

  const handleAddToFavorites = async (product) => {
    if (!user) {
      alert("Please log in to add to favorites.");
      return;
    }

    const existingFavorite = favorites.find((fav) => fav.name === product.name);
    if (!existingFavorite) {
      await addDoc(collection(db, "favorites"), {
        name: product.name,
        image: product.image,
        price: product.price,
        link: product.link,
        userId: user.uid,
      });

      setFavorites([...favorites, product]);
    } else {
      alert("Product is already in favorites.");
    }
  };

  return (
    <div
      className={`flex flex-wrap gap-3 lg:gap-5 mt-4 px-4 lg:pl-14 py-2 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      {products.length === 0 ? (
        <Loader type={"cylon"} color={"#2563EB"} />
      ) : (
        products.map((product, index) => (
          <div
            key={index}
            className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] p-4 rounded-lg shadow-lg flex flex-col"
            style={{
              backgroundColor: theme === "dark" ? "#374151" : "#D1D5DB",
            }}
          >
            <div className="flex-1 flex justify-center items-center overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                className="max-h-60 object-contain object-center"
                alt={product.name}
              />
            </div>
            <div className="p-2">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p
                className={`${
                  theme === "dark" ? "text-zinc-200" : "text-zinc-800"
                }`}
              >
                {formatPrice(product.price)}
              </p>
              <a
                className="text-blue-500 text-sm"
                href={product.link}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: {product.via}
              </a>
              <button
                className={`bg-blue-500 text-white px-4 py-2 mt-4 rounded hover:bg-blue-700`}
                onClick={() => handleAddToFavorites(product)}
              >
                Add to Favorites
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ProductList;
