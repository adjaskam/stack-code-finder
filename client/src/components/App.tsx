import CustomRoutes from "./routes/CustomRoutes";
import Header from "./Header";
import { Container } from "react-bootstrap";

const App = () => {
  return (
    <Container fluid className="bg-light vh-100">
      <Header />
      <CustomRoutes />
    </Container>
  );
};

export default App;
