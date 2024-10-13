import React, { useState, useEffect, createContext } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SearchBar from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import TopDeals from "./components/TopDeals";
import Loader from "./components/Loader";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Profile from "./components/Profile";
import { auth } from "./firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "./firebaseConfig";

export const ThemeContext = createContext();

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [products, setProducts] = useState([]);
  const [searchType, setSearchType] = useState(false);
  const [lowestPricedProducts, setLowestPricedProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState([]);
  const [user] = useAuthState(auth);

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      if (user) {
        const q = query(
          collection(db, "favorites"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const favoritesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(favoritesList);
      }
    };

    fetchFavorites();
  }, [user]);

  const handleSearch = (query) => {
    setLoading(true);
    setProducts([]);
    setSearchType(true);

    fetch(`/api/scrape?query=${query}&category=${selectedCategory}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        return response.json();
      })
      .then((data) => {
        setProducts(data);
        findLowestPricedProducts(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  };
  const searchHandle = () => {
    setSearchType(true);
  };

  const findLowestPricedProducts = (products) => {
    const platforms = {};

    products.forEach((product) => {
      const platform = product.via;
      if (
        !platforms[platform] ||
        parseFloat(product.price.replace(/[^\d.-]/g, "")) <
          parseFloat(platforms[platform].price.replace(/[^\d.-]/g, ""))
      ) {
        platforms[platform] = product;
      }
    });

    setLowestPricedProducts(Object.values(platforms));
  };

  const formatPrice = (price) => {
    if (price.includes("₹")) {
      return price;
    }
    return `₹${price}`;
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Router>
        <div
          className={`w-full h-screen font-['open'] ${
            theme === "dark"
              ? "bg-gray-800 text-white"
              : "bg-gray-100 text-black"
          }`}
        >
          <Navbar />
          <div>
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <SearchBar
                      onSearch={handleSearch}
                      theme={theme}
                      handler={searchHandle}
                    />
                    <CategorySelector
                      selectedCategory={selectedCategory}
                      onSelectCategory={setSelectedCategory}
                      theme={theme}
                    />
                    {loading && (
                      <Loader
                        type={"cylon"}
                        color={theme === "dark" ? "#fff" : "#2563EB"}
                      />
                    )}
                    {!loading && searchType && products.length > 0 && (
                      <ProductList
                        products={products}
                        formatPrice={formatPrice}
                        user={user}
                        favorites={favorites}
                        setFavorites={setFavorites}
                      />
                    )}
                    {!loading && lowestPricedProducts.length > 0 && (
                      <TopDeals
                        lowestPricedProducts={lowestPricedProducts}
                        formatPrice={formatPrice}
                        favorites={favorites}
                        setFavorites={setFavorites}
                        user={user}
                      />
                    )}
                  </>
                }
              />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </Router>
    </ThemeContext.Provider>
  );
};

export default App;
