import { Form, FloatingLabel } from "react-bootstrap";
import {
  CustomSelectPropsInterface,
  SelectOption,
} from "../code-fragments/types/codeFragments";

const CustomSelect = ({
  onChange,
  optionsList,
  label,
}: CustomSelectPropsInterface) => {
  return (
    <FloatingLabel controlId={`floatingInput-${label}`} label={label}>
      <Form.Select onChange={onChange}>
        {optionsList?.map((option: SelectOption) => (
          <option value={option.value}>{option.display || option.value}</option>
        ))}
      </Form.Select>
    </FloatingLabel>
  );
};

export default CustomSelect;
