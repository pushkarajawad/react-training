import { Nav } from "react-bootstrap";
import { NavLink } from "react-router-dom";
export const Sections = () => {
  return (
    <Nav fill variant="tabs" defaultActiveKey="/"  >
      <Nav.Item style={{background:"#007bff12"}}>
        <NavLink className="nav-link" to="/latest-movies">
          Latest Movies
        </NavLink>
      </Nav.Item>
      <Nav.Item style={{background:"#007bff12"}}>
        <NavLink className="nav-link" to="/upcoming-movies">
          Upcoming Movies
        </NavLink>
      </Nav.Item>
      <Nav.Item style={{background:"#007bff12"}}>
        <NavLink className="nav-link" to="/nearby-events">
          Nearby Events
        </NavLink>
      </Nav.Item>
    </Nav>
  );
};
