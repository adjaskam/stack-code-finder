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
  Spinner,
} from "react-bootstrap";
import styled from "styled-components";
import { CodeBlock, dracula } from "react-code-blocks";

const RootContainer = styled.div`
  height: 100vh;
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
          <Col lg={10}>
            <FloatingLabel controlId="floatingInput" label="Search code phrase">
              <FormControl
                as="textarea"
                onChange={(ev: React.BaseSyntheticEvent) => {
                  setSearchPhrase(ev.target.value);
                }}
              />
            </FloatingLabel>
          </Col>
          <InputControlCol lg={1}>
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
          <InputControlCol lg={1}>
            <Button onClick={fetchCodeFragments}>Fetch</Button>
          </InputControlCol>
        </Row>
      </Container>
      <Container fluid>
        <Row className="d-flex justify-content-center mt-3">
          {state.isLoading && (
            <div className="text-center">
              <Spinner animation="border" variant="dark" className="mb-3" />
              <h5> Fetching code fragments...</h5>
            </div>
          )}
          <Accordion className="my-3">
            {state.codeFragments?.map((item, index) => (
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>{item.hashMessage}</Accordion.Header>
                <Accordion.Body>
                  <CodeBlock
                    text={item.codeFragment}
                    theme={dracula}
                    language={item.tag}
                  />
                </Accordion.Body>
              </Accordion.Item>
            ))}
          </Accordion>
        </Row>
      </Container>
    </RootContainer>
  );
}

export default App;
