import React, { useContext, useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { StoreContext } from "./context/StoreContext";
import { ToastContainer } from "react-toastify";
import "./axiosHeaderRequestConfig.js";
import { isTokenExpired } from "./tokenUtils.js";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import NoPage from "./pages/NoPage";
import RoleRoute from "./config/RoleRoute";

// System Admin Routes
import SystemAdminPage from "./pages/SA/SystemAdminPage";
import SystemAdminDashboard from "./pages/SA/SystemAdminDashboard";
import ManageActors from "./pages/SA/ManageActors";
import ManageStudents from "./pages/SA/ManageStudents";
import ManageStudentsDetail from "./pages/SA/ManageStudentsDetail.jsx";
import ManageChapa from "./pages/SA/ManageChapa";

// General Manager Routes
import GeneralManagerPage from "./pages/GM/GeneralManagerPage";
import GeneralManagerDashboard from "./pages/GM/GeneralManagerDashboard";
import BudgetRequested from "./pages/GM/BudgetRequested";
import BudgetRequestedDetail from "./pages/GM/BudgetRequestedDetail.jsx";
import PaymentRequested from "./pages/GM/PaymentRequested";
import PaymentListDetail from "./pages/GM/PaymentListDetail.jsx";
import Messages from "./pages/GM/Messages.jsx";
import ViewReport from "./pages/GM/ViewReport";
import SetBudget from "./pages/GM/SetBudget.jsx";
import ProgramBudgetRequests from "./pages/GM/ProgramBudgetRequests.jsx"; 
import ProgramBudgetDetails from "./pages/GM/ProgramBudgetDetails.jsx";// Make sure this file exists

// School Director Routes
import SchoolDirectorPage from "./pages/SD/SchoolDirectorPage";
import SchoolDirectorDashboard from "./pages/SD/SchoolDirectorDashboard";
import SchoolDirectorRequest from "./pages/SD/SchoolDirectorRequest";

// Auditor Routes
import AuditorPage from "./pages/AU/AuditorPage";
import Dashboard from "./pages/AU/AuditorDashboard";
import ApprovedExpenditure from "./pages/AU/ApprovedBudget";
import ABP from "./pages/AU/ABP";
import ParentReceipt from "./pages/AU/ParentReceipt";

// Resource and Finance Head Routes
import ResourceAndFinanceHeadPage from "./pages/RFH/ResourceAndFinanceHeadPage";
import ResourceAndFinanceHeadDashboard from './pages/RFH/ResourceAndFinanceHeadDashboard';
import ResourceAndFinanceHeadRequest from './pages/RFH/ResourceAndFinanceHeadRequest';

// Human Resource Head Routes
import HumanResourcePage from "./pages/HR/HumanResourcePage";
import HumanResourceDashboard from "./pages/HR/HumanResourceDashboard";
import HumanResourceRequest from "./pages/HR/HumanResourceRequest";
import HumanResourceRequestDetail from "./pages/HR/HumanResourceRequestDetail.jsx";
import PreparePayroll from './pages/HR/PreparePayroll';
import ProgramBudget from "./pages/HR/ProgramBudget";
import ProgramBudgetDetail from "./pages/HR/ProgramBudgetDetail";

// Parents Routes
import Parent from "./pages/Parent/Parent";
import ParentDashboard from "./components/parent/Dashbord";
import ParentPayment from "./components/parent/Payment";
import PaymentHistory from "./components/parent/PaymentHistory";
import Notifications from "./components/parent/Notifications";
import ParentProfile from "./components/parent/Profile";
import PaymentReturn from "./components/PaymentReturn";
import Welcome from "./components/parent/Welcome";

const App = () => {
  const { userRole } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (userRole) {
      const redirectPath = RoleRoute[userRole] || "/";
      navigate(redirectPath);
    }
  }, [userRole, navigate]);
 
  useEffect(() => {
    const checkToken = () => {
      const token = localStorage.getItem("token");
      if (token && isTokenExpired(token)) {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        if (window.location.pathname !== "/login") {
          window.location.href = "/login";
        }
      }
    };

    checkToken();
    const interval = setInterval(checkToken, 10000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="*" element={<NoPage />} />

        {/* System Admin Routes */}
        <Route path="/system-admin-page" element={<SystemAdminPage />}>
          <Route index element={<SystemAdminDashboard />} />
          <Route path="system-admin-dashboard" element={<SystemAdminDashboard />} />
          <Route path="manage-actors" element={<ManageActors />} />
          <Route path="manage-students" element={<ManageStudents />} />
          <Route path="manage-students-detail/:id" element={<ManageStudentsDetail />} />
          <Route path="manage-chapa" element={<ManageChapa />} />
        </Route>

        {/* General Manager Routes */}
        <Route path="/general-manager-page" element={<GeneralManagerPage />}>
          <Route index element={<GeneralManagerDashboard />} />
          <Route path="general-manager-dashboard" element={<GeneralManagerDashboard />} />
          <Route path="payment-requested" element={<PaymentRequested />} />
          <Route path="payment-requested/:id" element={<PaymentListDetail />}/>
          <Route path="messages-page" element={<Messages/>} />
          <Route path="veiw-report" element={<ViewReport />} />
          <Route path="annual-budget" element={<SetBudget/>}/>
          <Route path="budget-requested" element={<BudgetRequested />} />
          <Route path="budget-requested/:id" element={<BudgetRequestedDetail/>}/>
          <Route path="program-budget-requests" element={<ProgramBudgetRequests />} />
          <Route path="program-budget-requests/:id" element={<ProgramBudgetDetails />} />
        </Route>

        {/* School Director Routes */}
        <Route path="/school-director-page" element={<SchoolDirectorPage />}>
          <Route index element={<SchoolDirectorDashboard />} />
          <Route path="school-director-dashboard" element={<SchoolDirectorDashboard />} />
          <Route path="school-director-request" element={<SchoolDirectorRequest />} />
        </Route>

        {/* Auditor Routes */}
        <Route path="/auditor-page" element={<AuditorPage />}>
          <Route index element={<Dashboard />} />
          <Route path="auditor-dashboard" element={<Dashboard />} />
          <Route path="abp" element={<ABP />} />
          <Route path="ab" element={<ApprovedExpenditure />} />
          <Route path="pr" element={<ParentReceipt />} />
        </Route>

        {/* Resource and Finance Head Routes */}
        <Route path="/resource-and-finance-head-page" element={<ResourceAndFinanceHeadPage />}>
          <Route index element={<ResourceAndFinanceHeadDashboard />} />
          <Route path="resource-and-finance-head-dashboard" element={<ResourceAndFinanceHeadDashboard />} />
          <Route path="resource-and-finance-head-request" element={<ResourceAndFinanceHeadRequest />} />
        </Route>

        {/* Human Resource Head Routes */}
        <Route path="/human-resource-page" element={<HumanResourcePage />}>
          <Route index element={<HumanResourceDashboard />} />
          <Route path="human-resource-dashboard" element={<HumanResourceDashboard />} />
          <Route path="prepare-payroll" element={<PreparePayroll />} />
          <Route path="human-resource-request" element={<HumanResourceRequest />} />
          <Route path="human-resource-request/:id" element={<HumanResourceRequestDetail/>}/>
          <Route path="program-budget" element={<ProgramBudget />} />
          <Route path="program-budget/:id" element={<ProgramBudgetDetail />} />
          <Route path="program-budget/edit/:id" element={<ProgramBudget />} />
        </Route>

        {/* Parent Routes */}
        <Route path="/parent" element={<Parent />}>
          <Route index element={<Welcome/>}/>
          <Route path="dashboard" element={<ParentDashboard />} />
          <Route path="profile" element={<ParentProfile />} />
          <Route path="payment" element={<ParentPayment />} />
          <Route path="pyament-history" element={<PaymentHistory />} />
          <Route path="notfication" element={<Notifications />} />
          <Route path="payment-return" element={<PaymentReturn />} />
        </Route>
      </Routes>
    </div>
  );
};

export default App;