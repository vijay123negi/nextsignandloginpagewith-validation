"use client";
import { useFormik } from "formik";
import { drawerloginSchema } from "../schema/page";
import React from "react";
import axios from "axios";
import Authlayout from "../authlayout/page";
import { TextField } from "@mui/material";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface AddUserProps {
  onUserAdded: (user: User) => void;
}

const AddUser: React.FC<AddUserProps> = ({ onUserAdded }) => {
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      createdAt: "",
    },
    validationSchema: drawerloginSchema,
    onSubmit: async (values, { resetForm }) => {
      const newUser: Omit<User, "id"> = {
        firstName: values.firstName,
        lastName: values.lastName,
        createdAt: values.createdAt,
      };

      if (!confirm("Do you want to add new user?")) return;

      try {
        const response = await axios.post(
          "https://660a54c30f324a9a2884ab85.mockapi.io/users",
          newUser
        );
        console.log("POST response:", response.data);
        resetForm();
        onUserAdded(response.data);
      } catch (error) {
        console.error("Failed to add user:", error);
      }
    },
  });

  return (
    <Authlayout>
      <div>
        <h3>Add Data</h3>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            type="text"
            name="firstName"
            placeholder="First name"
            value={formik.values.firstName}
            autoComplete="off"
            onChange={formik.handleChange}
          />
          {formik.errors.firstName && <div>{formik.errors.firstName}</div>}
          <TextField
            type="text"
            name="lastName"
            placeholder="Last name"
            value={formik.values.lastName}
            autoComplete="off"
            onChange={formik.handleChange}
          />
          {formik.errors.lastName && <div>{formik.errors.lastName}</div>}
          <TextField
            type="date"
            name="createdAt"
            value={formik.values.createdAt}
            onChange={formik.handleChange}
          />
          {formik.errors.createdAt && <div>{formik.errors.createdAt}</div>}
          <button type="submit">Submit</button>
        </form>
      </div>
    </Authlayout>
  );
};

export default AddUser;
