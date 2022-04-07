import { Form } from "react-bootstrap";
import {
  CustomSelectPropsInterface,
  SelectOption,
} from "../code-fragments/types/codeFragments";

const CustomSelect = ({
  onChange,
  optionsList,
}: CustomSelectPropsInterface) => {
  return (
    <Form.Select className="text-center" onChange={onChange}>
      {optionsList?.map((option: SelectOption) => (
        <option value={option.value}>{option.display || option.value}</option>
      ))}
    </Form.Select>
  );
};

export default CustomSelect;
