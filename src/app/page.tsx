"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { useFormik } from "formik";
import Link from "next/link";
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

const Home: React.FC = () => {
  const router = useRouter();

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
    useFormik({
      initialValues: initialValues,
      validationSchema: signUpSchema,
      onSubmit: (values, action) => {
        localStorage.setItem("users", JSON.stringify(values));
        action.resetForm();
        router.push("/login");
      },
    });

  return (
    <div className="container">
      <form onSubmit={handleSubmit} className="form-container">
        <h1>Signup</h1>

        <div className="form-group">
          <input
            type="text"
            placeholder="Username"
            name="name"
            autoComplete="off"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.name && touched.name && (
            <p className="form-error">{errors.name}</p>
          )}
        </div>

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

        <div className="form-group">
          <input
            type="password"
            placeholder="Confirm Password"
            name="confirm_password"
            autoComplete="off"
            value={values.confirm_password}
            onChange={handleChange}
            onBlur={handleBlur}
          />
          {errors.confirm_password && touched.confirm_password && (
            <p className="form-error">{errors.confirm_password}</p>
          )}
        </div>

        <button type="submit">Signup</button>
        <p>
          If you have an account , <Link href="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Home;
