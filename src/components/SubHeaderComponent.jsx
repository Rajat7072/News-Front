import React from "react";
import banner from "../images/news-banner.webp";
import news1 from "../images/News1.png";
import news2 from "../images/News2.jpg";
import news3 from "../images/news3.jpeg";

const SubHeaderComponent = () => {
  return (
    <>
      <div className="bannerStyle">
        <img style={{ padding: "5px" }} src={news3} alt="Banner..." />
        <img style={{ padding: "5px" }} src={news1} alt="Banner..." />
        <img style={{ padding: "5px" }} src={news2} alt="Banner..." />
        <img
          className="removeImage"
          style={{ padding: "5px" }}
          src={banner}
          alt="Banner..."
        />
      </div>
    </>
  );
};

export default SubHeaderComponent;
