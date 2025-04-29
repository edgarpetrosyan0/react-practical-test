import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';


export function RequireAuth({ children }: any) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) {
    return <Navigate to="/signin" />;
  }
  return children;
}

export function RedirectIfAuth({ children }: any) {
  const { isAuthenticated } = useAuth();
  if (isAuthenticated) {
    return <Navigate to="/home" />;
  }
  return children;
}
