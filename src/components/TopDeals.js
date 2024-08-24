import React from "react";

const TopDeals = ({ lowestPricedProducts, getHref, formatPrice }) => {
  return (
    <div className="max-w-screen-xl mx-auto p-4 rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Top Deals</h2>
      <div className="flex flex-wrap gap-3 lg:gap-5">
        {lowestPricedProducts.map((product, index) => (
          <div
            key={index}
            className="w-full min-[500px]:w-[45%] sm:w-[40%] md:w-[30%] lg:w-[22%] xl:w-[18%] p-2 rounded-lg shadow-md"
            style={{ backgroundColor: "#d9d9d9" }}
          >
            <div className="flex-1 flex justify-center items-center overflow-hidden rounded-lg bg-white">
              <img
                src={product.image}
                className="max-h-60 object-contain object-center"
                alt={product.name}
              />
            </div>
            <div className="p-2">
              <h3 className="font-bold text-lg">{product.name}</h3>
              <p className="text-gray-600">{formatPrice(product.price)}</p>
              <a
                className="text-blue-500 text-sm"
                href={getHref(product.via)}
                target="_blank"
                rel="noopener noreferrer"
              >
                Source: {product.via}
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TopDeals;
