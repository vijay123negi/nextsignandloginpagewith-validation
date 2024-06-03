"use client";
import { useFormik } from "formik";
import { drawerloginSchema } from "../schema/page";
import React, { useState } from "react";
import axios from "axios";
import { TextField } from "@mui/material";

interface User {
  id: string;
  firstName: string;
  lastName: string;
  createdAt: string;
}

interface UpdateUserProps {
  onUserUpdated: (user: User) => void;
}

const UpdateUser: React.FC<UpdateUserProps> = ({ onUserUpdated }) => {
  const formik = useFormik({
    initialValues: {
      id: "",
      firstName: "",
      lastName: "",
      createdAt: "",
    },
    validationSchema: drawerloginSchema,
    onSubmit: async (values, { resetForm }) => {
      if (!confirm("Do you want to update?")) return;

      const newUser: Omit<User, "id"> = {
        firstName: values.firstName,
        lastName: values.lastName,
        createdAt: values.createdAt,
      };

      try {
        const response = await axios.put(
          `https://660a54c30f324a9a2884ab85.mockapi.io/users/${values.id}`,
          newUser
        );
        console.log("POST response:", response.data);
        resetForm(); 
        onUserUpdated(response.data); 
      } catch (error) {
        console.error("Failed to add user:", error);
      }
    },
  });

  return (
    <div>
      <h3>Edit Data</h3>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          type="text"
          name="id"
          placeholder="Id"
          value={formik.values.id}
          autoComplete="off"
          onChange={formik.handleChange}
        />
        {formik.errors.id && <div>{formik.errors.id}</div>}
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
  );
};

export default UpdateUser;
