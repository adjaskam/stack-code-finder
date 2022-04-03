import CustomRoutes from "./components/routes/CustomRoutes";
import styled from "styled-components";

const RootContainer = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: #bdc1c6;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const App = () => {
  return (
    <RootContainer>
      <CustomRoutes />
    </RootContainer>
  );
};

export default App;
