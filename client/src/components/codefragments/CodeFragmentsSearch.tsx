import { useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import { codeFragmentsActionCreators } from "../../state";
import CustomSelect from "../shared/CustomSelect";
import {
  FloatingLabel,
  FormControl,
  Container,
  Row,
  Col,
  Button,
} from "react-bootstrap";
import { SCRAPER_TYPES, TAGS } from "./constants";

const CodeFragmentsSearch = () => {
  const dispatch = useDispatch();
  const {
    setSearchPhrase,
    setTag,
    fetchCodeFragments,
    setScraperType,
    setAmount,
    fetchAllOwnCodeFragments,
  } = bindActionCreators(codeFragmentsActionCreators, dispatch);

  return (
    <Container className="mt-3">
      <Row className="g-1 mb-3">
        <Col lg={6}>
          <FloatingLabel controlId="floatingInput" label="Search code phrase">
            <FormControl
              as="textarea"
              onChange={(ev: React.BaseSyntheticEvent) => {
                setSearchPhrase(ev.target.value);
              }}
            />
          </FloatingLabel>
        </Col>
        <Col lg={2}>
          <CustomSelect
            optionsList={TAGS}
            onChange={(ev: React.BaseSyntheticEvent) => {
              setTag(ev.target.value);
            }}
            label="Tag"
          />
        </Col>
        <Col lg={2}>
          <CustomSelect
            optionsList={SCRAPER_TYPES}
            onChange={(ev: React.BaseSyntheticEvent) => {
              setScraperType(ev.target.value);
            }}
            label="Scraper"
          />
        </Col>
        <Col lg={1}>
          <CustomSelect
            optionsList={Array.from({ length: 10 }, (_, i) => i + 1).map(
              (number) => ({
                value: number,
              })
            )}
            onChange={(ev: React.BaseSyntheticEvent) => {
              setAmount(ev.target.value);
            }}
            label="Amount"
          />
        </Col>
        <Col lg={1}>
          <Button style={{ minHeight: "100%" }} onClick={fetchCodeFragments}>
            Fetch
          </Button>
        </Col>
      </Row>
      <Button onClick={fetchAllOwnCodeFragments}>Show my code fragments</Button>
    </Container>
  );
};

export default CodeFragmentsSearch;
