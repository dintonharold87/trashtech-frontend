import React, { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@mui/x-data-grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import ReplyIcon from "@mui/icons-material/Reply";
// import Button from "@mui/material/Button";

// import { useNavigate } from "react-router-dom";

const API_URL = "http://localhost:2023";

const theme = createTheme({
  typography: {
    fontFamily: "Montserrat, sans-serif",
  },
});

const RequestList = () => {
  const [requests, setRequests] = useState([]);
 const navigate = useNavigate();
//   const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${API_URL}/api/client-requests`)
      .then((response) => {
        setRequests(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleRespond = (requestId) => {
    if (requestId) {
      navigate(`/respond/${requestId}`);
      console.log("Responding to request:", requestId);
    }
  };

  const columns = [
    { field: "name", headerName: "Name", width: 150 },
    { field: "contact", headerName: "Contact", width: 150 },
    { field: "location", headerName: "Location", width: 150 },
    { field: "requestedDate", headerName: "Date", width: 150 },
    { field: "requestedTime", headerName: "Time", width: 150 },
    {
      field: "action",
      headerName: "Respond",
      width: 130,
      disableClickEventBubbling: true,
      renderCell: (params) => (
        <IconButton
          component={Link}
          to={`/respond/${params.row._id}`} // Replace with your response form route
          onClick={() => handleRespond(params.row._id)}
          sx={{ color: "#043F2E" }}
        >
          <ReplyIcon />
        </IconButton>
      ),
    },
    // Add other fields here
  ];
  

  return (
    <ThemeProvider theme={theme}>
      <Box m="90px">
        <Typography component="h1" variant="h5">
          Client requests for garbage collection
        </Typography>
        <Box mt="40px" height="75vh">
          <DataGrid
            rows={requests}
            columns={columns}
            pageSize={3}
            getRowId={(row) => row._id}
          />
        </Box>
        
      </Box>
    </ThemeProvider>
  );
};

export default RequestList;
