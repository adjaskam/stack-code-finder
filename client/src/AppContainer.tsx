import AppRoutes from "./components/routes/AppRoutes";
import Header from "./components/shared/Header";
import { Container } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";

const AppContainer = () => {
  return (
    <Container fluid className="bg-light vh-100">
      <Header />
      <AppRoutes />
      <NotificationContainer />
    </Container>
  );
};

export default AppContainer;
