import React, { useState, useEffect } from "react";
import Lottie from "react-lottie";
import "./NotFound.css";

const NotFound = () => {
  const [animationData, setAnimationData] = useState(null);

  useEffect(() => {
    const fetchAnimationData = async () => {
      try {
        const response = await fetch(
          "https://lottie.host/fc397bc2-2e88-41d3-a221-1c6710a0b3d1/lTapGNSBgj.json"
        );
        const data = await response.json();
        setAnimationData(data);
      } catch (error) {
        console.error("Error fetching animation data:", error);
      }
    };

    fetchAnimationData();
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <div className="notfound-container">
      <h2 className="notfound-title">404 Not Found</h2>
      <p className="notfound-subtext">
        The page you are looking for does not exist.
      </p>
      {animationData && (
        <div className="notfound-animation">
          <Lottie options={defaultOptions} />
        </div>
      )}
    </div>
  );
};

export default NotFound;
