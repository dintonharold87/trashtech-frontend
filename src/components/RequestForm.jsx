import React from "react";
import { useNavigate } from "react-router-dom";
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
  location: "",
  requestedDate: "",
  requestedTime: "",
};

// Form validation using yup
const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  contact: Yup.string().required("Contact is required"),
  location: Yup.string().required("Location is required"),
  requestedDate: Yup.string().required("Date is required"),
  requestedTime: Yup.string().required("Time is required"),
});
// // onsubmit function
// const onSubmit = (values) => {
//   console.log(values);
// };

// Client Request component
const RequestForm = () => {
  const navigate = useNavigate();

  
 

  
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(
        `${API_URL}/api/submit-garbage-request`,
        values
      );
      console.log(response.data);
      actions.resetForm();
      alert("Request was sent successfully!");
    } catch (error) {
      console.log(error);
      alert("Request failed. Please try again.");
    }
    navigate("/client_profile");
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
            Request for garbage collection
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
                      name="contact"
                      required
                      fullWidth
                      id="contact"
                      label="Contact"
                      autoFocus
                      value={values.contact}
                      onChange={handleChange}
                      error={touched.contact && Boolean(errors.contact)}
                      helperText={touched.contact && errors.contact}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      name="location"
                      required
                      fullWidth
                      id="location"
                      label="Location"
                      autoFocus
                      value={values.location}
                      onChange={handleChange}
                      error={touched.location && Boolean(errors.location)}
                      helperText={touched.location && errors.location}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="requestedDate"
                      label="Request Date"
                      name="requestedDate"
                      type="string"
                      value={values.requestedDate}
                      onChange={handleChange}
                      error={
                        touched.requestedDate && Boolean(errors.requestedDate)
                      }
                      helperText={touched.requestedDate && errors.requestedDate}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="requestedTime"
                      label="Request Time"
                      name="requestedTime"
                      type="string"
                      value={values.requestedTime}
                      onChange={handleChange}
                      error={
                        touched.requestedTime && Boolean(errors.requestedTime)
                      }
                      helperText={touched.requestedTime && errors.requestedTime}
                    />
                  </Grid>
                </Grid>

                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                    }}
                  >
                    <Link
                      to="/client_profile"
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
                      send
                    </Button>
                  </Box>
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
export default RequestForm;
