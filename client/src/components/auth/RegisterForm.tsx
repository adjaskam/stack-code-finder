import { AuthFormPropsInterface, UserCredentialsInterface } from "./types/auth";
import CustomFormField from "./CustomFormField";
import { RegisterSchema } from "./validation/AuthValidationSchema";
import { Formik, Form } from "formik";
import { Button } from "react-bootstrap";

const RegisterForm = ({
  submitText,
  submitCallback,
}: AuthFormPropsInterface) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
        repeatedPassword: "",
      }}
      validationSchema={RegisterSchema}
      onSubmit={(values) =>
        submitCallback({
          email: values.email,
          password: values.password,
        } as UserCredentialsInterface)
      }
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form>
          <CustomFormField
            name="Email"
            valueType="email"
            type="text"
            value={values.email}
            handleChange={handleChange}
            touched={touched.email}
            error={errors.email}
          />
          <CustomFormField
            name="Password"
            valueType="password"
            type="password"
            value={values.password}
            handleChange={handleChange}
            touched={touched.password}
            error={errors.password}
          />
          <CustomFormField
            name="Repeated password"
            valueType="repeatedPassword"
            type="password"
            value={values.repeatedPassword}
            handleChange={handleChange}
            touched={touched.repeatedPassword}
            error={errors.repeatedPassword}
          />
          <Button type="submit">Submit</Button>
        </Form>
      )}
    </Formik>
  );
};

export default RegisterForm;
