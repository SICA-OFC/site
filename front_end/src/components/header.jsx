import logo from "../assets/logo.png";
import line from "../assets/Line 3.png";
import ListItem from "./listItem.jsx";
import "./css/header.css";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <div id="atalhos">
        <a href="#">
          <img className="logo" src={logo} />
        </a>
        <img src={line} />
        <nav>
          <ul>
            <ListItem href={"#"} texto={"Home"} />
            <ListItem href={"#"} texto={"Equipes"} />
            <ListItem href={"#"} texto={"Chaves"} />
            <ListItem href={"#"} texto={"Modalidades"} />
          </ul>
        </nav>
      </div>
      <Link to="/login">
        <svg
          className="user-icon"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512l388.6 0c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304l-91.4 0z" />
        </svg>
      </Link>
    </header>
  );
}
