import { useDispatch, useSelector } from "react-redux";
import { bindActionCreators } from "redux";
import { codeFragmentsActionCreators, State } from "../../state";
import {
  Accordion,
  Container,
  Row,
  Button,
  Spinner,
  Pagination,
  Card,
  useAccordionButton,
} from "react-bootstrap";
import { CodeBlock, dracula } from "react-code-blocks";

const CodeFragmentsDisplay = () => {
  const dispatch = useDispatch();
  const {
    removeCancelToken,
    fetchAllOwnCodeFragments,
    setPage,
    deleteCodeFragment,
    clearData,
  } = bindActionCreators(codeFragmentsActionCreators, dispatch);
  const state = useSelector((state: State) => state.codeFragment);

  const CustomToggle = ({
    children,
    eventKey,
    questionId,
    hashMessage,
  }: any) => {
    const decoratedOnClick = useAccordionButton(eventKey);

    return (
      <div className="d-flex justify-content-between align-items-center">
        <a
          target="_blank"
          href={`https://stackoverflow.com/questions/${questionId}`}
        >
          {questionId}
        </a>
        <div className="d-flex">
          <Button
            variant="danger"
            onClick={(ev: any) => {
              deleteCodeFragment(hashMessage);
            }}
          >
            Delete
          </Button>
          <Button onClick={decoratedOnClick} className="ms-2">
            Show
          </Button>
        </div>
      </div>
    );
  };

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
          {state.itemsInTotal > 0 && (
            <Pagination>
              {state.itemsInTotal > 0 &&
                Array.from(
                  { length: Math.ceil(state.itemsInTotal / 6) },
                  (_, i) => i
                ).map((page) => (
                  <Pagination.Item
                    key={page}
                    active={page === state.page}
                    onClick={() => {
                      if (page != state.page) {
                        setPage(page);
                        fetchAllOwnCodeFragments();
                      }
                    }}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
            </Pagination>
          )}
          {state.codeFragments?.map((item, index) => (
            <Accordion>
              <Card>
                <Card.Header>
                  <CustomToggle
                    eventKey={index.toString()}
                    questionId={item.questionId}
                    hashMessage={item.hashMessage}
                  />
                </Card.Header>
                <Accordion.Collapse eventKey={index.toString()}>
                  <Card.Body>
                    <CodeBlock
                      text={item.codeFragment}
                      theme={dracula}
                      language={item.tag}
                    />
                  </Card.Body>
                </Accordion.Collapse>
              </Card>
            </Accordion>
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
