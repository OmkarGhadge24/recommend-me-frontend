import React from "react";
import Loader from "./Loader";

const ProductList = ({ products, getHref, formatPrice }) => {
  return (
    <div className="flex flex-wrap gap-3 lg:gap-5 mt-4 px-4 lg:pl-14 py-2">
      {products.length === 0 ? (
        <Loader type={"cylon"} color={"#2563EB"} delay={1000} />
      ) : (
        products.length > 0 && (
          <>
            {products.map((product) => (
              <div
                key={product.id}
                className="w-full min-[500px]:w-[45%] sm:w-[40%] md:w-[30%] lg:w-[22%] xl:w-[18%] p-2 rounded-lg shadow-md flex flex-col"
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
                    href={product.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Source: {product.via}
                  </a>
                </div>
              </div>
            ))}
          </>
        )
      )}
    </div>
  );
};

export default ProductList;
