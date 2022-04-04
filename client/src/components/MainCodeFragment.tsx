import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import {
  codeFragmentsActionCreators,
  userSessionActionCreators,
  State,
} from "../state";
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

const InputControlCol = styled(Col)`
  max-height: 58px;
  display: flex;
`;

const MainCodeFragment = () => {
  const dispatch = useDispatch();
  const {
    setSearchPhrase,
    setTag,
    fetchCodeFragments,
    removeCancelToken,
    setScraperType,
    fetchAllOwnCodeFragments,
  } = bindActionCreators(codeFragmentsActionCreators, dispatch);
  
  const { logoutUser } = bindActionCreators(
    userSessionActionCreators,
    dispatch
  );

  const state = useSelector((state: State) => state.codeFragment);
  return (
    <>
      <Container className="mt-3">
        <Row className="d-flex justify-content-end mb-3">
          <Col lg={1}>
            <Button variant="link" onClick={logoutUser}>
              Logout
            </Button>
          </Col>
        </Row>
        <Row className="g-1 mb-3">
          <Col lg={7}>
            <FloatingLabel controlId="floatingInput" label="Search code phrase">
              <FormControl
                as="textarea"
                onChange={(ev: React.BaseSyntheticEvent) => {
                  setSearchPhrase(ev.target.value);
                }}
              />
            </FloatingLabel>
          </Col>
          <InputControlCol lg={2}>
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
          <InputControlCol lg={2}>
            <Form.Select
              className="text-center"
              onChange={(ev: React.BaseSyntheticEvent) => {
                setScraperType(ev.target.value);
              }}
            >
              <option value="cheerio">cheerio</option>
              <option value="puppeteer">puppeteer</option>
            </Form.Select>
          </InputControlCol>
          <InputControlCol lg={1}>
            <Button onClick={fetchCodeFragments}>Fetch</Button>
          </InputControlCol>
        </Row>
        <Button onClick={fetchAllOwnCodeFragments}>
          Show my code fragments
        </Button>
      </Container>
      <Container fluid>
        <Row className="d-flex justify-content-center mt-5">
          {state.isLoading && (
            <div className="text-center">
              <Spinner animation="border" variant="dark" className="mb-3" />
              <h5> Fetching code fragments...</h5>
              <Button
                onClick={(e) => {
                  if (state.abortToken) {
                    state.abortToken.cancel();
                  }
                  return removeCancelToken();
                }}
              >
                Cancel request
              </Button>
            </div>
          )}
          <Accordion className="my-3">
            {state.codeFragments?.length > 0 && (
              <p className="text-center">
                To view related Stackoverflow thread click on Question ID in
                item header
              </p>
            )}
            {state.codeFragments?.map((item, index) => (
              <Accordion.Item eventKey={index.toString()}>
                <Accordion.Header>
                  <a
                    target="_blank"
                    href={`https://stackoverflow.com/questions/${item.questionId}`}
                  >
                    {item.questionId}
                  </a>
                </Accordion.Header>
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
        {state.executionTime && (
          <p>Execution time: {(state.executionTime / 1000).toFixed(2)} s </p>
        )}
      </Container>
    </>
  );
};

export default MainCodeFragment;
