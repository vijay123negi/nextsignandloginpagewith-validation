"use client";
import React, { useEffect, useState }  from "react";
import { Formik, Form, Field } from "formik";
import { TextField, Button, Box, Typography } from "@mui/material";
import axios from "axios";
import { drawerloginSchema } from "../schema/page";


const FormComponent = ({
  onUserAdded,
  onUserUpdated,
  userData,
  userId,
  action,
}: any) => {
  const [initialValues, setInitialValues] = useState({ firstName: "", lastName: "", createdAt: new Date().toISOString().split("T")[0] });

  useEffect(() => {
    if (userData) {
      setInitialValues({
        firstName: userData.firstName || "",
        lastName: userData.lastName || "",
        createdAt: userData.createdAt || new Date().toISOString().split("T")[0],
      });
    }
  }, [userData]);

  const handleSubmit = async (
    values: { firstName: string; lastName: string; createdAt: string },
    { resetForm }: { resetForm: () => void }
  ) => {
    console.log("Form Submitted", values);
    if (action === "add") {
      if (confirm("Do you want to add new user?")) {
        try {
          const response = await axios.post(
            "https://660a54c30f324a9a2884ab85.mockapi.io/users",
            values
          );
          console.log("POST response:", response.data);
          resetForm();
          onUserAdded(response.data);
        } catch (error) {
          console.error("Failed to add user:", error);
        }
      }
    } else if (action === "edit") {
      if (confirm("Do you want to update user?")) {
        try {
          const response = await axios.put(
            `https://660a54c30f324a9a2884ab85.mockapi.io/users/${userId}`,
            values
          );
          console.log("PUT response:", response.data);
          resetForm();
          onUserUpdated(response.data);
        } catch (error) {
          console.error("Failed to update user:", error);
        }
      }
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
      }}
    >
      <Typography>{action}</Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={drawerloginSchema}
        onSubmit={handleSubmit}
        enableReinitialize={true}
      >
        {({ handleChange, values, errors }) => (
          <Form>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Field
                name="firstName"
                as={TextField}
                label="First Name"
                value={values.firstName}
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.firstName && <div>{errors.firstName}</div>}
              <Field
                name="lastName"
                as={TextField}
                label="Last Name"
                value={values.lastName}
                autoComplete="off"
                onChange={handleChange}
              />
              {errors.lastName && <div>{errors.lastName}</div>}
              <Field
                name="createdAt"
                as={TextField}
                label="Created At"
                type="date"
                value={values.createdAt}
                autoComplete="off"
                onChange={handleChange}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <Button type="submit" variant="contained" color="primary">
                Submit
              </Button>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default FormComponent;
