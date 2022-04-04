import * as Yup from "yup";

const BasePasswordValidation = Yup.string()
  .min(8, "Password length should be 8 at minimal")
  .matches(
    new RegExp(
      '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,64}$'
    ),
    "Password should have minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:"
  );

const LoginSchema = Yup.object().shape({
  email: Yup.string().required("Required value").email("Must be a valid email"),
  password: BasePasswordValidation.required("Password is required"),
});

const RegisterSchema = LoginSchema.shape({
  repeatedPassword: BasePasswordValidation.oneOf(
    [Yup.ref("password")],
    "Your passwords do not match."
  ).required("Repeated password is required"),
});

export { LoginSchema, RegisterSchema };
