import React from "react";
import ReactLoading from "react-loading";

const Loader = ({ type, color }) => {
  return (
    <div className="max-w-screen-xl mx-auto flex flex-col items-center justify-center">
      <ReactLoading type={type} color={color} height={40} width={200} />
      <h5 className="font-semibold">Collecting Data</h5>
    </div>
  );
};

export default Loader;
