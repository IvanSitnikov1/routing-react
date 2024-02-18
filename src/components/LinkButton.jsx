import { NavLink } from "react-router-dom";

export const LinkButton = ({ title, to, onClick, ...props }) => {
  return (
    <NavLink
      to={to}
      className="button"
      onClick={onClick}
      {...props}
    >
      {title}
    </NavLink>
  );
};