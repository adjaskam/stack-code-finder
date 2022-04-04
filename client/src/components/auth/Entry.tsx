import { useDispatch } from "react-redux";
import { Container, Tabs, Tab } from "react-bootstrap";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";
import { userSessionActionCreators } from "../../state";
import { bindActionCreators } from "redux";
import { UserCredentialsInterface } from "./types/auth";
import axios from "../../api/axiosInstance";

const Entry = () => {
  const dispatch = useDispatch();
  const { loginUser } = bindActionCreators(userSessionActionCreators, dispatch);

  // no need to proceed with any state
  const registerUser = async (credentials: UserCredentialsInterface) => {
    try {
      await axios.post("/register", credentials);
    } catch (error) {}
  };

  return (
    <Container className="mt-3 bg-light p-3 rounded-2">
      <Tabs defaultActiveKey="login" className="mb-3">
        <Tab eventKey="login" title="Login">
          <LoginForm submitText="Login" submitCallback={loginUser} />
        </Tab>
        <Tab eventKey="register" title="Register">
          <RegisterForm submitText="Register" submitCallback={registerUser} />
        </Tab>
      </Tabs>
    </Container>
  );
};

export default Entry;
