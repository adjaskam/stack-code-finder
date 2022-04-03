import { useDispatch, useSelector } from "react-redux";
import { State } from "../../state";
import { Container, Tabs, Tab } from "react-bootstrap";
import AuthForm from "./AuthForm";
import { actionCreators } from "../../state";
import { bindActionCreators } from "redux";

const Login = () => {
  const dispatch = useDispatch();
    const {
      loginUser, logoutUser
    } = bindActionCreators(actionCreators, dispatch);

  return (
    <Container className="mt-3 bg-light p-3 rounded-2">
      <Tabs defaultActiveKey="login" className="mb-3">
        <Tab eventKey="login" title="Login">
          <AuthForm submitText="Login" submitCallback={loginUser} />
        </Tab>
        <Tab eventKey="register" title="Register">
          <AuthForm submitText="Register" submitCallback={() => {}} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Login;
