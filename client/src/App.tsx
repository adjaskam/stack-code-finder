import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { actionCreators, State } from "./state";
import {
  Accordion,
  FloatingLabel,
  FormControl,
  Form,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import styled from "styled-components";

const RootContainer = styled.div`
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #bdc1c6;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const InputControlCol = styled(Col)`
  max-height: 58px;
  display: flex;
`;

function App() {
  const dispatch = useDispatch();
  const { setSearchPhrase, setTag, fetchCodeFragments } = bindActionCreators(
    actionCreators,
    dispatch
  );

  const state = useSelector((state: State) => state.codeFragment);
  return (
    <RootContainer>
      <Container className="mt-3">
        <Row className="g-1">
          <Col xs={12} md={10}>
            <FloatingLabel controlId="floatingInput" label="Search code phrase">
              <FormControl
                as="textarea"
                onChange={(ev: React.BaseSyntheticEvent) => {
                  setSearchPhrase(ev.target.value);
                }}
              />
            </FloatingLabel>
          </Col>
          <InputControlCol xs={12} md={1}>
            <Form.Select
              className="text-center"
              onChange={(ev: React.BaseSyntheticEvent) => {
                setTag(ev.target.value);
              }}
            >
              <option value="Java">Java</option>
              <option value="Rust">Rust</option>
              <option value="Golang">Golang</option>
            </Form.Select>
          </InputControlCol>
          <InputControlCol xs={12} md={1}>
            <Button onClick={fetchCodeFragments}>Fetch</Button>
          </InputControlCol>
        </Row>
      </Container>
      <Accordion className="p-3">
        {state.codeFragments?.map((item, index) => (
          <Accordion.Item eventKey={index.toString()}>
            <Accordion.Header>{item.hashMessage}</Accordion.Header>
            <Accordion.Body>{item.codeFragment}</Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </RootContainer>
  );
}

export default App;
