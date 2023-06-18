import React from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import { Formik } from "formik";
import * as Yup from "yup";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import SendIcon from "@mui/icons-material/Send";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:2023";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const initialValues = {
  name: "",
  contact: "",
  age: "",
  licenseNumber: "",
};

// Form validation using yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contact: Yup.string().required("Contact is required"),
  age: Yup.number()
    .min(18, "You must be above 18years old")
    .required("Age is required"),
  licenseNumber: Yup.string()
    .required("National id number is required"),
  
});
// // onsubmit function
// const onSubmit = (values) => {
//   console.log(values);
// };

// Admin registration component
const DriverRegistration = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(`${API_URL}/api/drivers`, values);
      console.log(response.data);
      actions.resetForm();
      alert("Driver Registration successful!");
    } catch (error) {
      console.log(error);
      alert("Registration failed. Please try again.");
    }
    navigate("/admin_dashboard");
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xs" component="main" sx={{ mb: 8, mt: 16 }}>
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          {/* Form Title */}
          <Typography component="h2" variant="h5">
            Driver Registration Form
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {(
              {
                isSubmitting,
                values,
                errors,
                handleSubmit,
                handleChange,
                touched,
              } // Beginning of the form
            ) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                {/* Main container for input fields */}
                <Grid container spacing={2} sx={{ mb: 4 }}>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      autoComplete="given-name"
                      name="name"
                      required
                      fullWidth
                      id="name"
                      label="Full Name"
                      autoFocus
                      value={values.name}
                      onChange={handleChange}
                      error={touched.name && Boolean(errors.name)}
                      helperText={touched.name && errors.name}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="contact"
                      label="Contact"
                      name="contact"
                      autoComplete="contact"
                      type="string"
                      value={values.contact}
                      onChange={handleChange}
                      error={touched.contact && Boolean(errors.contact)}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="age"
                      label="Age"
                      name="age"
                      type="number"
                      value={values.age}
                      onChange={handleChange}
                      error={touched.age && Boolean(errors.age)}
                      helperText={touched.age && errors.age}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      id="licenseNumber"
                      name="licenseNumber"
                      label="National Id Number"
                      type="string"
                      value={values.licenseNumber}
                      onChange={handleChange}
                      error={
                        touched.licenseNumber && Boolean(errors.licenseNumber)
                      }
                      helperText={touched.licenseNumber && errors.licenseNumber}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Link
                        to="/admin_dashboard"
                        style={{ textDecoration: "none" }}
                      >
                        <Button
                          sx={{
                            backgroundColor: "#043F2E",
                            color: "#ffffff",
                            "&:hover": {
                              backgroundColor: "#043F2E", // Custom hover color
                              color: "#78C51C", // Custom hover text color
                            },
                          }}
                          endIcon={<ArrowBackIcon />}
                          variant="contained"
                        >
                          Back
                        </Button>
                      </Link>
                      <Button
                        endIcon={<SendIcon />}
                        type="submit"
                        variant="contained"
                        sx={{
                          backgroundColor: "#043F2E",
                          color: "#ffffff",
                          "&:hover": {
                            backgroundColor: "#043F2E", // Custom hover color
                            color: "#78C51C", // Custom hover text color
                          },
                        }}
                        disabled={isSubmitting}
                      >
                        Register
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
              //   End of the form
            )}
          </Formik>
        </Box>
      </Container>
    </ThemeProvider>
  );
};
export default DriverRegistration;
