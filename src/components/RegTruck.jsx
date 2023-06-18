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
  truckNumber: "",
  licensePlate: "",
  
};

// Form validation using yup
const validationSchema = Yup.object().shape({
  truckNumber: Yup.string().required("Truck Number is required"),
  licensePlate: Yup.string().required("License number is required"),
  
});
// // onsubmit function
// const onSubmit = (values) => {
//   console.log(values);
// };

// Admin registration component
const TruckRegistration = () => {
  const navigate = useNavigate();
  const handleSubmit = async (values, actions) => {
    try {
      const response = await axios.post(`${API_URL}/api/garbage-trucks`, values);
      console.log(response.data);
      actions.resetForm();
      alert("Truck Registration successful!");
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
            Truck Registration Form
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
                      
                      name="truckNumber"
                      required
                      fullWidth
                      id="truckNumber"
                      label="Truck Number"
                      autoFocus
                      value={values.truckNumber}
                      onChange={handleChange}
                      error={touched.truckNumber && Boolean(errors.truckNumber)}
                      helperText={touched.truckNumber && errors.truckNumber}
                    />
                  </Grid>
                  
                  
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      id="licensePlate"
                      name="licensePlate"
                      label="Truck License Number"
                      type="string"
                      value={values.licensePlate}
                      onChange={handleChange}
                      error={
                        touched.licensePlate && Boolean(errors.licensePlate)
                      }
                      helperText={touched.licensePlate && errors.licensePlate}
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
export default TruckRegistration;
