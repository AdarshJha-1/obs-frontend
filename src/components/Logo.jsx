import React from "react";
import logo from "/logo.svg"; // Import the SVG file

const Logo = ({ size = 100 }) => (
  <img src={logo} alt="OBS Logo" width={size} height={size} />
);

export default Logo;
