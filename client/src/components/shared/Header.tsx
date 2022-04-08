import { Navbar, Container, Nav } from "react-bootstrap";
import { bindActionCreators } from "redux";
import { userSessionActionCreators, State } from "../../state";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const dispatch = useDispatch();

  const { logoutUser } = bindActionCreators(
    userSessionActionCreators,
    dispatch
  );
  const state = useSelector((state: State) => state.userSession);

  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>stack-code-finder</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          {state.jwtToken && (
            <Nav>
              <Nav.Link onClick={logoutUser}>Logout</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
