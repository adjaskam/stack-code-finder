import { CustomGroupPropsInterface } from "./types/auth";
import { FormControl, FormLabel, FormGroup, Button } from "react-bootstrap";

const CustomFormField = ({
  name,
  value,
  handleChange,
  touched,
  error,
  type,
  valueType
}: CustomGroupPropsInterface) => (
  <FormGroup className="mb-3">
    <FormLabel>{name}</FormLabel>
    <FormControl
      type={type}
      name={valueType}
      value={value}
      onChange={handleChange}
      isValid={touched && !error}
      isInvalid={!!error}
    />
    <FormControl.Feedback type="invalid">{error}</FormControl.Feedback>
  </FormGroup>
);

export default CustomFormField;