import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Formik } from "formik";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import FormHelperText from "@mui/material/FormHelperText";
const API_URL = "http://localhost:2023"; // Replace with your backend server URL

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

// Initial values
const initialValues = { email: "", role: "", password: "" };
// validation using yup
const validationSchema = Yup.object().shape({
  email: Yup.string().email().required("Email is required"),
  role: Yup.string().required("Role is required"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters"),
});

// onsubmit function
// const onSubmit = (values) => {
//   console.log(values);
// };
const Login = () => {
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post(`${API_URL}/api/login`, values);
      //  const { message } = response.data;
       // Redirect based on the role
       if (values.role === "admin") {
         navigate("/admin_dashboard");
       } else if (values.role === "client") {
         navigate("/client_profile");
       }
      console.log(response.data);
    } catch (error) {
      console.log(error);

      alert("Login failed. Please try again.");
    }
    
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" sx={{ mb: 2, mt: 12 }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validationSchema={validationSchema}
          >
            {({
              isSubmitting,
              values,
              errors,
              handleSubmit,
              handleChange,
              touched,
            }) => (
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{ mt: 1 }}
              >
                <Grid container spacing={2} sx={{ mb: 8 }}>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="email"
                      label="Email Address"
                      name="email"
                      autoComplete="email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={touched.role && Boolean(errors.role)}
                    >
                      <InputLabel id="role-label">Role</InputLabel>
                      <Select
                        labelId="role-label"
                        id="role"
                        name="role"
                        label="Role"
                        color="success"
                        onChange={handleChange}
                        value={values.role}
                        fullWidth
                      >
                        <MenuItem value="admin">Admin</MenuItem>
                        <MenuItem value="client">Client</MenuItem>
                      </Select>
                      {errors.role && touched.role && (
                        <FormHelperText>{errors.role}</FormHelperText>
                      )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      color="success"
                      id="password"
                      name="password"
                      label="Password"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      error={touched.password && Boolean(errors.password)}
                      helperText={touched.password && errors.password}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
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
                      login
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            )}
          </Formik>
        </Box>
        <Grid container>
          <Grid item xs={5}>
            <Link
              to="/admin_registration"
              className="text-greenDark hover:text-greenDarker underline text-xs sm:text-sm"
            >
              Sign up as an admin
            </Link>
          </Grid>
          <Grid item xs={7}>
            <Link
              to="/client_registration"
              className="text-greenDark hover:text-greenDarker underline text-xs sm:text-sm"
            >
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default Login;
