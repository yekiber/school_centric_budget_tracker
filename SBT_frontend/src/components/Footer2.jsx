import React from "react";

const Footer2 = () => {
  return (
    <footer className="bg-blue-950 text-white py-5 text-center">
      <div className="flex justify-between max-w-screen-xl mx-auto px-4">
        <p className="text-sm mb-2">
          Track Expenses | Set Budget | View Reports
        </p>
        <p className="text-sm mb-2">
          Location: Ambassador Sefer, Sibu Sire, Welega | Phone: +251 911 92-36-42
        </p>
        <p className="text-xs mt-4">
          © {new Date().getFullYear()} SSSC. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer2;
