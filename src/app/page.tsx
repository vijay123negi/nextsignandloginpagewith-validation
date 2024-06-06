"use client"
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { signUpSchema } from "./schema/page";

interface SignupFormValues {
  name: string;
  email: string;
  password: string;
  confirm_password: string;
}

const initialValues: SignupFormValues = {
  name: "",
  email: "",
  password: "",
  confirm_password: "",
};

const Signup: React.FC = () => {
  const router = useRouter();

  const handleSubmit = (values: SignupFormValues, action: any) => {
    localStorage.setItem("users", JSON.stringify(values));
    router.push("/login");
    action.resetForm();
  };

  return (
    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={signUpSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form-container">
          <h1>Signup</h1>
          <div className="form-group">
            <Field
              type="text"
              placeholder="Username"
              name="name"
              autoComplete="off"
            />
            <ErrorMessage name="name" component="p" className="form-error" />
          </div>
          <div className="form-group">
            <Field
              type="text"
              placeholder="Email"
              name="email"
              autoComplete="off"
            />
            <ErrorMessage name="email" component="p" className="form-error" />
          </div>
          <div className="form-group">
            <Field
              type="password"
              placeholder="Password"
              name="password"
              autoComplete="off"
            />
            <ErrorMessage
              name="password"
              component="p"
              className="form-error"
            />
          </div>
          <div className="form-group">
            <Field
              type="password"
              placeholder="Confirm Password"
              name="confirm_password"
              autoComplete="off"
            />
            <ErrorMessage
              name="confirm_password"
              component="p"
              className="form-error"
            />
          </div>
          <button type="submit">Signup</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Signup;
