import React, { useState } from "react";
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

const App = () => {
  const [selectedCategory, setSelectedCategory] = useState("Other");
  const [products, setProducts] = useState([]);
  const [searchType, setSearchType] = useState(false);
  const [lowestPricedProducts, setLowestPricedProducts] = useState([]);
  const [loading, setLoading] = useState(false);

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

  const searchHandle = () => {
    setSearchType(true);
  };

  const formatPrice = (price) => {
    if (price.includes("₹")) {
      return price;
    }
    return `₹${price}`;
  };

  return (
    <Router>
      <div className="w-full h-screen font-['open']">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <SearchBar onSearch={handleSearch} handler={searchHandle} />
                <CategorySelector
                  selectedCategory={selectedCategory}
                  onSelectCategory={setSelectedCategory}
                />
                {loading && <Loader type={"cylon"} color={"#2563EB"} />}
                {!loading && searchType && products.length > 0 && (
                  <ProductList products={products} formatPrice={formatPrice} />
                )}
                {!loading && lowestPricedProducts.length > 0 && (
                  <TopDeals
                    lowestPricedProducts={lowestPricedProducts}
                    formatPrice={formatPrice}
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
    </Router>
  );
};

export default App;

