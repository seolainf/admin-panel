import React from "react";

const Section = ({ title }) => {
  return (
    <div className="section" style={{ fontSize: "1.5rem", fontWeight: 700 }}>
      {title}
    </div>
  );
};

export default Section;
