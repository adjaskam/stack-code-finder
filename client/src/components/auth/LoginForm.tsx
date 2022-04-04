import { AuthFormPropsInterface, UserCredentialsInterface } from "./types/auth";
import CustomFormField from "./CustomFormField";
import { LoginSchema } from "./validation/AuthValidationSchema";
import { Formik, Form, Field } from "formik";
import { Button } from "react-bootstrap";

const LoginForm = ({ submitText, submitCallback }: AuthFormPropsInterface) => {
  return (
    <Formik
      initialValues={{
        email: "",
        password: "",
      }}
      validationSchema={LoginSchema}
      onSubmit={(values) => {
        return submitCallback(values as UserCredentialsInterface);
      }}
    >
      {({ handleChange, values, touched, errors }) => (
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
            type="password"
            valueType="password"
            value={values.password}
            handleChange={handleChange}
            touched={touched.password}
            error={errors.password}
          />
          <Button type="submit">{submitText}</Button>
        </Form>
      )}
    </Formik>
  );
};

export default LoginForm;
