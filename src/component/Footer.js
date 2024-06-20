import React from "react";
import "./footer.css";

let year  = new Date().getFullYear();

const Footer = () => (
  <footer className="footer">
    &emsp;Copyright &copy;&nbsp;{year}&nbsp;-&nbsp;MOZZHUB: BIPARTITE NETWORK-BASED DENGUE MOSQUITO DETECTOR

  </footer>
);

export default Footer