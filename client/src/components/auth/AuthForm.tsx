import { useState } from "react";
import { Form, Button } from "react-bootstrap";

interface AuthFormProps {
  submitText: string;
  submitCallback: (credentials: UserCredentialsInterface) => void;
}

export interface UserCredentialsInterface {
  email: string;
  password: string;
}

const AuthForm = ({ submitText, submitCallback }: AuthFormProps) => {
  const [credentials, setCredentials] = useState<UserCredentialsInterface>({
    email: "",
    password: "",
  });

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          onChange={(event) =>
            setCredentials({ ...credentials, email: event.target.value })
          }
        />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          placeholder="Password"
          onChange={(event) =>
            setCredentials({ ...credentials, password: event.target.value })
          }
        />
      </Form.Group>
      <Button
        variant="primary"
        onClick={() => submitCallback(credentials)}
      >
        {submitText}
      </Button>
    </Form>
  );
};

export default AuthForm;
