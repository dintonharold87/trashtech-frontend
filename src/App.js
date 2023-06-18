import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Routes, Route, useLocation } from "react-router-dom";
import About from "./components/About";
import Faqs from "./components/Faqs";
import Contact from "./components/Contact";
import Login from "./components/Login";
import AdminRegistration from "./components/AdminRegistration";
import ClientRegistration from "./components/ClientRegistration";
import AdminDashboard from "./components/AdminDashboard";
import DriverRegistration from "./components/RegDriver";
import TruckRegistration from "./components/RegTruck";
import DriverList from "./components/DriverList";
import TruckList from "./components/TruckList";
import RequestList from "./components/RequestList";
import ResponseList from "./components/ResponseList";
import ResponseForm from "./components/ResponseForm";
import UserProfileDashboard from "./components/ClientProfile";
import RequestForm from "./components/RequestForm";

function App() {
  const location = useLocation();
  const isDashboardRoute = location.pathname.startsWith("/admin_dashboard");
  const isRegisterDriver = location.pathname.startsWith("/reg_driver");
  const isRegisterTruck = location.pathname.startsWith("/reg_truck");
  const isClientResponse = location.pathname.startsWith("/respond/");
  const isClientProfile = location.pathname.startsWith("/client_profile");
  const isRequestForm = location.pathname.startsWith("/request_form");
  return (
    <>
      {isDashboardRoute ||
      isRegisterDriver ||
      isRegisterTruck ||
      isClientResponse ||
      isClientProfile ||
      isRequestForm ? null : (
        <Navbar />
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin_registration" element={<AdminRegistration />} />
        <Route path="/client_registration" element={<ClientRegistration />} />
        <Route path="/reg_driver" element={<DriverRegistration />} />
        <Route path="/reg_truck" element={<TruckRegistration />} />
        <Route path="/admin_dashboard" element={<AdminDashboard />} />
        <Route path="/client_profile" element={<UserProfileDashboard />} />
        <Route path="/drivers" element={<DriverList />} />
        <Route path="/trucks" element={<TruckList />} />
        <Route path="/responses" element={<ResponseList />} />
        <Route path="/requests" element={<RequestList />} />
        <Route path="/respond/:requestId" element={<ResponseForm />} />
        <Route path="/request_form" element={<RequestForm />} />
      </Routes>
    </>
  );
}

export default App;
