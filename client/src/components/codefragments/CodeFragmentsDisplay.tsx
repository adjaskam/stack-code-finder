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
} from "react-bootstrap";
import { CodeBlock, dracula } from "react-code-blocks";
import { setPage } from "../../state/action-creators/codeFragmentsActionCreators";

const CodeFragmentsDisplay = () => {
  const dispatch = useDispatch();
  const { removeCancelToken, fetchAllOwnCodeFragments, setPage } =
    bindActionCreators(codeFragmentsActionCreators, dispatch);
  const state = useSelector((state: State) => state.codeFragment);

  const paginateCodeFragments = () => {
    const pages = Math.ceil(state.itemsInTotal / 5);
    const paginationBarItems = [];
    for (let page = 1; page <= pages; page++) {
      paginationBarItems.push(
        <Pagination.Item key={page} active={page === 1}>
          {page}
        </Pagination.Item>
      );
    }
    return paginationBarItems;
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
              {console.log(state.itemsInTotal)}
              {state.itemsInTotal > 0 &&
                Array.from(
                  { length: Math.ceil(state.itemsInTotal / 6) },
                  (_, i) => i
                ).map((page) => (
                  <Pagination.Item
                    key={page}
                    active={page === state.page}
                    onClick={() => {
                      setPage(page);
                      fetchAllOwnCodeFragments();
                    }}
                  >
                    {page + 1}
                  </Pagination.Item>
                ))}
            </Pagination>
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
