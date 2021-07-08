import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export const Header = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Navbar.Brand>
        <NavLink className="navbar-brand" to="/">e-Cube</NavLink>
      </Navbar.Brand>
      <Nav className="mr-auto"></Nav>
      <Form inline>
        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
        <Button variant="outline-light">Search</Button>
      </Form>
    </Navbar>
  );
};
