import React from 'react';
import { FaArrowLeft } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center mb-4 cursor-pointer" onClick={() => navigate(-1)}>
      <FaArrowLeft className="text-xl mr-2" />
      <span className="text-lg">Back</span>
    </div>
  );
};

export default BackButton;
