import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from "react-router-dom";

import Register from "../pages/FormRegister"; // Import the Register component
import Login from "../pages/Login/Login";
import DashboardAdmin from "../pages/DashboardAdmin/DashboardAdmin";
import DashboardUser from "../pages/DashboardUser/DashboardUser";
import NotFound from "../pages/NotFound/NotFound";
import ProtectedRoute from "./ProtectedRoute";
import { Role } from "../interfaces/User";
import Profile from "../pages/Profile/Profile";
import UserManagementView from "../pages/UserManagementView/UserManagementView";


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Login />} />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole={Role.ADMIN}>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      >
        <Route path="all-users" element={<UserManagementView />} />
        <Route path="perfil" element={<Profile />} />
      </Route>

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute requiredRole={Role.USER}>
            <DashboardUser />
          </ProtectedRoute>
        }
      >
        <Route path="profile" element={<Profile />} />
      </Route>

      <Route path="/*" element={<NotFound />} />
      <Route path="/register" element={<Register />} />
    </>
  )
);

export default router;