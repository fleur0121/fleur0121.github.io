import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import style from "src/components/Nav/Nav.module.css";

const NavBar = () => {
  return (
    <Navbar className={style.navBar}>
      <Nav className={style.navBarElements} id="nav">
        <Nav.Link href="#nav">Home</Nav.Link>
        <Nav.Link href="#bio">Bio</Nav.Link>
        <Nav.Link href="#skills">Skills</Nav.Link>
        <Nav.Link href="#project">Project</Nav.Link>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    </Navbar>
  );
};

export default NavBar;
