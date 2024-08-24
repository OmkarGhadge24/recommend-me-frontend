import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import CategorySelector from "./components/CategorySelector";
import ProductList from "./components/ProductList";
import Navbar from "./components/Navbar";
import TopDeals from "./components/TopDeals";
import Loader from "./components/Loader";

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
      .then((response) => response.json())
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
  const getHref = (via) => {
    switch (via) {
      case "Amazon":
        return "https://www.amazon.in";
      case "Flipkart":
        return "https://www.flipkart.com";
      case "Snapdeal":
        return "https://www.snapdeal.com";
      case "Meesho":
        return "https://www.meesho.com";
      case "1mg":
        return "https://www.1mg.com";
      case "PharmEasy":
        return "https://www.pharmeasy.in";
      case "Zepto":
        return "https://www.zeptonow.com";
      case "Netmeds":
        return "https://www.netmeds.com";
      case "Nykaa":
        return "https://www.nykaa.com";
      default:
        return "#";
    }
  };

  const findLowestPricedProducts = (products) => {
    const platforms = {};
    
    products.forEach(product => {
      const platform = product.via;
      if (!platforms[platform] || parseFloat(product.price.replace(/[^\d.-]/g, '')) < parseFloat(platforms[platform].price.replace(/[^\d.-]/g, ''))) {
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
    <div className="w-full h-screen font-['open']">
      <Navbar />
      <SearchBar onSearch={handleSearch} handler={searchHandle} />
      <CategorySelector
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {loading && <Loader type={"cylon"} color={"#2563EB"} />}
      {!loading && searchType && products.length > 0 && (
        <ProductList products={products} formatPrice={formatPrice} getHref={getHref} />
      )}
      {!loading && lowestPricedProducts.length > 0 && (
        <TopDeals
          lowestPricedProducts={lowestPricedProducts}
          formatPrice={formatPrice}
          getHref={getHref}
        />
      )}
    </div>
  );
};

export default App;