import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { codeFragmentsActionCreators, State } from "../../state";
import { Accordion, Container, Row, Button, Spinner } from "react-bootstrap";
import { CodeBlock, dracula } from "react-code-blocks";

const CodeFragmentsDisplay = () => {
  const dispatch = useDispatch();
  const { removeCancelToken } = bindActionCreators(
    codeFragmentsActionCreators,
    dispatch
  );
  const state = useSelector((state: State) => state.codeFragment);

  return (
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
              To view related Stackoverflow thread click on Question ID in item
              header
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
        <p>Execution time: {(state.executionTime / 1000).toFixed(2)}s </p>
      )}
    </Container>
  );
};

export default CodeFragmentsDisplay;
