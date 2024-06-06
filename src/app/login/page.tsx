"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { loginSchema } from "../schema/page";

interface LoginFormValues {
  email: string;
  password: string;
}

const initialValues: LoginFormValues = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  const router = useRouter();
  const handleSubmit = (values: LoginFormValues, action: any) => {
    const storedUser = localStorage.getItem("users");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.email === values.email && user.password === values.password) {
        localStorage.setItem("authenticated", "true");
        router.push("/dashboard");
      } else {
        alert("Invalid email or password");
      }
    } else {
      alert("No user found. Please sign up.");
    }

    action.resetForm();
  };

  return (

    <div className="container">
      <Formik
        initialValues={initialValues}
        validationSchema={loginSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form-container">
          <h1>Login</h1>
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
          <button type="submit">Login</button>
        </Form>
      </Formik>
    </div>
  );
};

export default Login;
