import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Button from "@mui/material/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
import AddIcon from '@mui/icons-material/Add';
const API_URL = "http://localhost:2023";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const DriverList = () => {
  const [drivers, setDrivers] = useState([]);
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const navigate = useNavigate();
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

  const columns = [
    { field: "name", headerName: "Name", width: 200 },
    { field: "contact", headerName: "Contact", width: 200 },
    { field: "age", headerName: "Age", width: 200 },
    { field: "licenseNumber", headerName: "National Id Number", width: 200 },
    // Add other fields here
  ];
  const handleButtonClick = () => {
    navigate("/reg_driver");
  };

  return (
    <ThemeProvider theme={theme}>
      <Box m="90px">
        <Typography component="h1" variant="h5">
          List of Drivers
        </Typography>
        <Box mt="40px" height="75vh">
          <DataGrid
            rows={drivers}
            columns={columns}
            pageSize={3}
            getRowId={(row) => row._id}
          />
        </Box>
        <Box mt="20px">
          <Button
            type="submit"
            variant="contained"
            onClick={handleButtonClick}
            endIcon={<AddIcon/>}
            sx={{
              backgroundColor: "#043F2E",
              color: "#ffffff",
              "&:hover": {
                backgroundColor: "#043F2E", // Custom hover color
                color: "#78C51C", // Custom hover text color
              },
              width: isMobile ? "100%" : "200px",
              mt: 2,
            }}
          >
            {isMobile ? "Add" : "Add Driver"}
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default DriverList;
