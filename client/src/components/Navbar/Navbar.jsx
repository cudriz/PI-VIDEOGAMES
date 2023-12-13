import React from "react";
import style from "./Navbar.module.css";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar";

const Navbar = () => {
  return (
    <div className={style.navbar_cont}>
      <div className={style.navbar_img_cont}>
        <Link to={"/home"}>
          <img src="https://www.creativefabrica.com/wp-content/uploads/2023/05/08/Video-Game-Controller-Logo-Graphics-69127373-1-1-580x387.png" alt="" />
        </Link>
      </div>
      <div className={style.navbar_link_cont}>
        <Link to={"/home"}>Home</Link>
        <Link to={"/form"}>Formulario</Link>
      </div>
      <SearchBar />
    </div>
  );
};

export default Navbar;
