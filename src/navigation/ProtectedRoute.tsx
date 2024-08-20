import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Navigate } from 'react-router-dom';
import LoadingSpinner from '../components/LoadingSpinner';
import { Role } from '../interfaces/User';

interface ProtectedRouteProps {
  requiredRole?: Role; 
  children: ReactNode;
}

const ProtectedRoute = ({ requiredRole, children }: ProtectedRouteProps) => {
  const { isAuthenticated, role, status } = useSelector((state: RootState) => state.auth);

  if (status === 'loading') {
    return <LoadingSpinner centered size={50} />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={role === Role.ADMIN ? "/dashboard/all-users" : "/dashboard/profile"} />;
    console.log("Role:", role);
console.log("Required Role:", requiredRole);

  }

  return <>{children}</>;
};

export default ProtectedRoute;
