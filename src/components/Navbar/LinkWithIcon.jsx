/* eslint-disable react/prop-types */
import { NavLink } from "react-router-dom";
import "./LinkWithIcon.css";

const LinkWithIcon = ({ title, link, emoji, sidebar }) => {
  return (
    <NavLink
      to={link}
      className={sidebar ? "align_center sidebar_link" : "align_center"}
    >
      {title}
      <img src={emoji} alt="home icon" className="link_emoji" />
    </NavLink>
  );
};

export default LinkWithIcon;
