import React from "react";
import { createPortal } from "react-dom";
import { IoIosCloseCircle } from "react-icons/io";

const Model = ({ onClose, isOpen, children }) => {
  return createPortal(
    <>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-50 flex items-center justify-center">
            <div className="relative z-50 w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl bg-gray-100 p-6 rounded-lg shadow-lg overflow-hidden">
              <div className="flex justify-end">
                <IoIosCloseCircle
                  onClick={onClose}
                  className="text-2xl cursor-pointer"
                />
              </div>
              <div className="min-h-[60vh] max-h-[80vh] overflow-y-auto overflow-x-hidden">
                {children}
              </div>
            </div>
            <div
              onClick={onClose}
              className="fixed inset-0 z-40 bg-black opacity-50 backdrop-blur-sm"
            />
          </div>
        </>
      )}
    </>,
    document.getElementById("model-root")
  );
};

export default Model;
