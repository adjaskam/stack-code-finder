import { useDispatch } from "react-redux";
import { Container, Tabs, Tab } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { actionCreators } from "../../state";
import { bindActionCreators } from "redux";

const Entry = () => {
  const dispatch = useDispatch();
    const {
      loginUser, logoutUser
    } = bindActionCreators(actionCreators, dispatch);

  return (
    <Container className="mt-3 bg-light p-3 rounded-2">
      <Tabs defaultActiveKey="login" className="mb-3">
        <Tab eventKey="login" title="Login">
          <LoginForm submitText="Login" submitCallback={loginUser} />
        </Tab>
        <Tab eventKey="register" title="Register">
          <RegisterForm submitText="Register" submitCallback={() => {}} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Entry;
