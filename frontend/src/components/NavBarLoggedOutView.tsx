import { Button } from "react-bootstrap";

interface NavBarLoggedOutViewProps {
    onSignUpClicked: () => void,
    onLoginClicked: () => void,
}

const NavBarLoggedOutView = ({ onSignUpClicked, onLoginClicked }: NavBarLoggedOutViewProps) => {
    return (
        <>
            <Button variant="success" onClick={onSignUpClicked}>Sign Up</Button> &nbsp;
            <Button variant="success" onClick={onLoginClicked}>Log In</Button>
        </>
    );
}

export default NavBarLoggedOutView;