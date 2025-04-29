import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks';


export function RequireAuth({ children }:any) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

export function RedirectIfAuth({ children }:any) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/home" /> : children;
}
