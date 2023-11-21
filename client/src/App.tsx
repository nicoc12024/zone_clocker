import React, { FC, useContext, ReactNode } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./layout/Layout";
import LayoutEmployee from "./layout/LayoutEmployee";
import Home from "./pages/home/Home";
import ListOfEmployees from "./pages/employees/listOfEmployees/ListOfEmployees";
import AddEmployee from "./pages/employees/addEmployee/AddEmployee";
import AddNewZone from "./pages/employees/addNewZone/AddNewZone";
import AddShift from "./pages/employees/addShift/AddShift";
import Account from "./pages/account/Account";
import { Login } from "./pages/auth/Login";
import { LoginEmployee } from "./pages/auth/LoginEmployee";
import { CreateAccount } from "./pages/auth/CreateAccount";
import AuthProvider, { AuthContext } from "./context/AuthContext";
import EmployeePage from "./pages/employeePage/EmployeePage";

const ProtectedRoute: React.FC<{ children: ReactNode; allowedRoles: string[] }> = ({
  children,
  allowedRoles,
}) => {
  const authContext = useContext(AuthContext);

  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  const { currentUser, loading, userRole } = authContext;

  if (loading) {
    return <div>Loading...</div>;
  }

  // we check if the user is logged in and if the user role is allowed in all
  // the protected routes and "first match wins", It does not stop evaluating of fail conditions
  if (currentUser && allowedRoles.includes(userRole)) {
    return <>{children}</>;
  }
  return <Navigate to="/login" />;
};

const App: FC = () => {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/login-employee" element={<LoginEmployee />} />
          <Route path="/create-account" element={<CreateAccount />} />

          {/* Admin Routes */}
          <Route
            path="/"
            element={
              <ProtectedRoute allowedRoles={["admin"]}>
                <Layout />
              </ProtectedRoute>
            }
          >
            <Route path="/" element={<Home />} />
            <Route path="list-of-employees" element={<ListOfEmployees />} />
            <Route path="add-employee" element={<AddEmployee />} />
            <Route path="edit-employee" element={<AddEmployee />} />
            <Route path="add-new-zone" element={<AddNewZone />} />
            <Route path="add-shift" element={<AddShift />} />
            <Route path="account" element={<Account />} />
          </Route>

          {/* Employee Routes */}
          <Route
            path="employee"
            element={
              <ProtectedRoute allowedRoles={["employee"]}>
                <LayoutEmployee />
              </ProtectedRoute>
            }
          >
            <Route path="home" element={<EmployeePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
};

export default App;
