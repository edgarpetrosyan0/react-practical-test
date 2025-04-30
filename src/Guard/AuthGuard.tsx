import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';


export const RequireAuth: React.FC<any> = ({ children }:any) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export const RedirectIfAuth: React.FC<any> = ({ children }:any) => {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return children;
}

