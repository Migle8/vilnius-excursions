import { Link, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/esm/Button';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { logout, getLoggedInUser } from "../utils/auth/authenticate";
import styles from "../styles/Home.module.css";

function Header() {

    const navigate = useNavigate();

    async function onLogOut() {
        try {
            await logout();
            navigate("/login");
        } catch (error) {
            return error.message;
        }
    }

    const logedInUser = getLoggedInUser();

    const { userName } = styles;

    return (
        <Navbar className="position-fixed w-100 z-2" bg="light" data-bs-theme="light">
            <Container>
                <Navbar.Brand href="/">
                    <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/666666/wolf.png"
                        alt="wolf" />
                    {/* <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/wolf.png" alt="wolf"/> */}
                    {/* <img width="40" height="40" src="https://img.icons8.com/glyph-neue/64/6e6d6d/wolf.png" 
                alt="wolf"/> */}
                </Navbar.Brand>
                <Nav className="me-auto">
                    {/* <Nav.Link href="#features">Features</Nav.Link> */}
                    <NavDropdown title="Menu" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/">All Excursions</NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.1">
                            Solo Excursions
                        </NavDropdown.Item>
                        <NavDropdown.Item href="#action/3.2">Excursions for Groups</NavDropdown.Item>
                        {logedInUser ?
                            <>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="/myexcursions">My Excursions</NavDropdown.Item>
                            </>
                            :
                            null
                        }
                    </NavDropdown>
                </Nav>
                {logedInUser ?
                    <>
                        <p className={userName}>{logedInUser.data.name}</p>
                        <Button onClick={onLogOut} variant='warning'>Log Out</Button>
                    </>
                    :
                    <Link to={"/login"}>
                        <Button variant="warning">Log In</Button>
                    </Link>
                }
            </Container>
        </Navbar>
    );
}

export default Header;