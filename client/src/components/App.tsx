import AppRoutes from "./routes/AppRoutes";
import Header from "./shared/Header";
import { Container } from "react-bootstrap";
import { NotificationContainer } from "react-notifications";

const App = () => {
  return (
    <Container fluid className="bg-light vh-100">
      <Header />
      <AppRoutes />
      <NotificationContainer />
    </Container>
  );
};

export default App;
