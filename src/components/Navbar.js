import React, { useState } from "react";
import { FaInfoCircle } from "react-icons/fa";
import Model from "./Model";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);

  const onOpen = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  return (
    <div className="max-w-screen-xl mx-auto py-4 font-['roboto'] flex items-center justify-between px-6">
      <h2 className="text-sm sm:text-md lg:text-xl font-semibold">
        Recommend Me
      </h2>
      <FaInfoCircle className="cursor-pointer text-xl" onClick={onOpen} />
      <Model onClose={onClose} isOpen={isOpen}>
        <div className="min-h-[60vh] overflow-hidden p-1 md:p-2">
          <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 text-center">
            About Recommend Me
          </h2>
          <p className="mb-2 md:mb-4 text-sm md:text-md lg:text-lg">
            <strong>Recommend Me</strong> is your go-to platform for
            personalized product recommendations. Our advanced system analyzes
            extensive data to bring you the most relevant products.
          </p>
          <p className="mb-2 md:mb-4 text-sm md:text-md lg:text-lg">
            Whether it's the latest tech, trendy fashion, or medicines,{" "}
            <strong>Recommend Me</strong> curates a tailored selection, ensuring
            you find the best deals and high-quality products.
          </p>
          <p className="mb-2 md:mb-4 text-sm md:text-md lg:text-lg">
            Just click on the category you want. If the category does not exist,
            select "Other" and search for any product.
          </p>
          <p className="mb-2 md:mb-4 text-sm md:text-md lg:text-lg">
            Please note that it takes some time to show the data.
          </p>
        </div>
      </Model>
    </div>
  );
};

export default Navbar;
