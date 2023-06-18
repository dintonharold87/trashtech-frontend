import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";

// import { useNavigate } from "react-router";

// import Button from "@mui/material/Button";

// import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:2023";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const ResponseList = () => {
  const [response, setResponse] = useState([]);
 
  //   const navigate = useNavigate();
 useEffect(() => {
   axios
     .get(`${API_URL}/api/responses`)
     .then((response) => {
       setResponse(response.data);
     })
     .catch((error) => {
       console.log(error);
     });
 }, []);

  const columns = [
    { field: "driver", headerName: "Driver", width: 150 },
    { field: "date", headerName: "Date", width: 150 },
    {
      field: "truckLicenseNumber",
      headerName: "Truck License Number",
      width: 200,
    },
    { field: "driverContact", headerName: "Driver Contact", width: 200 },
    { field: "orderStatus", headerName: "Order Status", width: 150 },
  ];

  return (
    <ThemeProvider theme={theme}>
      <Box m="90px">
        <Typography component="h1" variant="h5">
          Responses from Admin
        </Typography>
        <Box mt="40px" height="75vh">
          <DataGrid
            rows={response}
            columns={columns}
            pageSize={3}
            getRowId={(row) => row._id}
          />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default ResponseList;
