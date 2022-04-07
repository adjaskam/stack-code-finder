import AppRoutes from "./routes/AppRoutes";
import Header from "./shared/Header";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container fluid className="bg-light vh-100">
      <Header />
      <AppRoutes />
    </Container>
  );
};

export default App;
