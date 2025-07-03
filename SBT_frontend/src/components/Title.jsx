import React from "react";

const Title = ({ title }) => {
  return (
    <div className=" fade-in text-center my-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-700">{title}</h1>
    </div>
  );
};

export default Title;
