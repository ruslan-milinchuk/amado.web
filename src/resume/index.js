import React from "react";

const Resume = () => (
  <div className="wrapper">
    <div className="section">
      <h1 className="name"></h1>
      <h3 className="role"></h3>
      <div className="contacts">
        <div className="contacts__phone"></div>
        <div className="contacts__email"></div>
        <div className="contacts__address"></div>
        <div className="contacts__github"></div>
      </div>
      <div className="photo">
        <img src="" alt="me" />
      </div>
    </div>
    <div className="section">
      <div className="experience">
        <div className="experience__section"></div>
        <div className="experience__section"></div>
      </div>
    </div>
  </div>
);

export default Resume;
