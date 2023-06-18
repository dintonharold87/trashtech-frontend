import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormHelperText from "@mui/material/FormHelperText";
import { Link } from "react-router-dom";
const API_URL = "http://localhost:2023";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

//status details
const status = ["Pending", "Accepted", "Rejected", "Completed"];

const initialValues = {
  driver: "",
  date: "",
  truckLicenseNumber: "",
  driverContact: "",
  orderStatus: "",
};

// Form validation using yup
const validationSchema = Yup.object().shape({
  driver: Yup.string().required("Driver is required"),
  date: Yup.string().required("Date is required"),
  truckLicenseNumber: Yup.string().required("Truck license number is required"),
  driverContact: Yup.string().required("Contact is required"),
  orderStatus: Yup.string().required("Order status is required"),
});
// // onsubmit function
// const onSubmit = (values) => {
//   console.log(values);
// };

// Client Response component
const ResponseForm = () => {
  const navigate = useNavigate();

  const [drivers, setDrivers] = useState([]);
  const [driverContacts, setDriverContacts] = useState([]);
  const [truckLicenseNumbers, setTruckLicenseNumbers] = useState([]);
  const { requestId } = useParams();
  useEffect(() => {
    axios
      .get(`${API_URL}/api/drivers`)
      .then((response) => {
        setDrivers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/garbage-trucks`)
      .then((response) => {
        const trucks = response.data;
        const licenseNumbers = trucks.map((truck) => truck.licensePlate);
        setTruckLicenseNumbers(licenseNumbers);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleDriverChange = (selectedDriver) => {
    const selectedDriverData = drivers.find(
      (driver) => driver.name === selectedDriver
    );
    setDriverContacts([selectedDriverData.contact]);
  };
  const handleSubmit = async (values, actions) => {
    try {
      
      const response = await axios.post(
        `${API_URL}/api/client-requests/${requestId}/respond`,
        values
      );
      console.log(response.data);
      actions.resetForm();
      alert("Response was sent successfully!");
    } catch (error) {
      console.log(error);
      alert("Response failed. Please try again.");
    }
    navigate("/requests");
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
            Response to Client Form
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
                    <FormControl fullWidth>
                      <InputLabel id="driver">Driver Name</InputLabel>
                      <Select
                        color="success"
                        id="driver"
                        name="driver"
                        label="Driver Name"
                        fullWidth
                        labelId="driver"
                        value={values.driver}
                        onChange={(event) => {
                          handleChange(event);
                          handleDriverChange(event.target.value);
                        }}
                        error={touched.driver && Boolean(errors.driver)}
                        helperText={touched.driver && errors.driver}
                      >
                        {drivers.map((driver) => (
                          <MenuItem key={driver._id} value={driver.name}>
                            {driver.name}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      color="success"
                      required
                      fullWidth
                      id="date"
                      label="date"
                      name="date"
                      type="string"
                      value={values.date}
                      onChange={handleChange}
                      error={touched.date && Boolean(errors.date)}
                      helperText={touched.date && errors.date}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl
                      fullWidth
                      error={
                        touched.truckLicenseNumber &&
                        Boolean(errors.truckLicenseNumber)
                      }
                    >
                      <InputLabel id="truckLicenseNumber">
                        Truck License Number
                      </InputLabel>
                      <Select
                        color="success"
                        id="truckLicenseNumber"
                        name="truckLicenseNumber"
                        label="Truck License Number"
                        fullWidth
                        labelId="truckLicenseNumber"
                        onChange={handleChange}
                        value={values.truckLicenseNumber}
                      >
                        {truckLicenseNumbers.map((licenseNumber) => (
                          <MenuItem key={licenseNumber} value={licenseNumber}>
                            {licenseNumber}
                          </MenuItem>
                        ))}
                      </Select>
                      {errors.truckLicenseNumber &&
                        touched.truckLicenseNumber && (
                          <FormHelperText>
                            {errors.truckLicenseNumber}
                          </FormHelperText>
                        )}
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth>
                      <InputLabel id="driverContact">Driver Contact</InputLabel>
                      <Select
                        color="success"
                        id="driverContact"
                        name="driverContact"
                        label="Driver Contact"
                        fullWidth
                        labelId="driverContact"
                        value={values.driverContact}
                        onChange={handleChange}
                        error={
                          touched.driverContact && Boolean(errors.driverContact)
                        }
                        helperText={
                          touched.driverContact && errors.driverContact
                        }
                      >
                        {driverContacts.map((contact) => (
                          <MenuItem key={contact} value={contact}>
                            {contact}
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid item xs={12}>
                      <FormControl
                        fullWidth
                        error={
                          touched.orderStatus && Boolean(errors.orderStatus)
                        }
                      >
                        <InputLabel id="orderStatus">Request status</InputLabel>
                        <Select
                          color="success"
                          id="orderStatus"
                          name="orderStatus"
                          label="Request status"
                          fullWidth
                          labelId="orderStatus"
                          value={values.orderStatus}
                          onChange={handleChange}
                        >
                          {status.map((status) => (
                            <MenuItem key={status} value={status}>
                              {status}
                            </MenuItem>
                          ))}
                        </Select>
                        {touched.orderStatus && Boolean(errors.orderStatus) && (
                          <FormHelperText>{errors.orderStatus}</FormHelperText>
                        )}
                      </FormControl>
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
                        send
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
export default ResponseForm;
