"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
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

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: loginSchema,
      onSubmit: (values, action) => {
        const storedUser = localStorage.getItem("users");
        if (storedUser) {
          const user = JSON.parse(storedUser);
          if (
            user.email === values.email &&
            user.password === values.password
          ) {
            localStorage.setItem("authenticated", "true");
            router.push("/home");
          } else {
            alert("Invalid email or password");
          }
        } else {
          alert("No user found. Please sign up.");
        }

        action.resetForm();
      },
    });

  return (
    <form onSubmit={handleSubmit} className="form-container">
      <h1>Login</h1>
      <div className="form-group">
        <input
          type="text"
          placeholder="Email"
          name="email"
          autoComplete="off"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && (
          <p className="form-error">{errors.email}</p>
        )}
      </div>
      <div className="form-group">
        <input
          type="password"
          placeholder="Password"
          name="password"
          autoComplete="off"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && (
          <p className="form-error">{errors.password}</p>
        )}
      </div>
      <button type="submit">Login</button>
    </form>
  );
};

export default Login;
