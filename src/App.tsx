import React from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import { Home, NotFound, Signin, Signup, UserDetails, Users } from './pages';
import { Navbar } from './components/Navbar';
import { useAuth } from './hooks';
import useWindowSize from './hooks/useWindowSize';

// TODO: Add route guards based on authentication state
// - If the user IS authenticated, prevent access to `/signin` and `/signup` routes
// - If the user is NOT authenticated, prevent access to `/home`, `/users`, and `/users/:id`
// - You can use a `PrivateRoute` or `RequireAuth` wrapper component for protected pages
// - Consider redirecting:
//    - Authenticated users from `/signin` or `/signup` → to `/home`
//    - Unauthenticated users from protected pages → to `/signin`


function RequireAuth({ children }:any) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? children : <Navigate to="/signin" />;
}

function RedirectIfAuth({ children }:any) {
  const { isAuthenticated, loading } = useAuth();
  if (loading) return <div>Loading...</div>;
  return isAuthenticated ? <Navigate to="/home" /> : children;
}

function AuthLayout({ children }:any) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}

function App() {
  // TODO create useWindowSize custom hook, and store window size and device information in the redux utilsSlice.ts used detectDevice action
  useWindowSize();

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/home"
            element={
              <RequireAuth>
                <AuthLayout><Home /></AuthLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/users"
            element={
              <RequireAuth>
                <AuthLayout><Users /></AuthLayout>
              </RequireAuth>
            }
          />
          <Route
            path="/users/:id"
            element={
              <RequireAuth>
                <AuthLayout><UserDetails /></AuthLayout>
              </RequireAuth>
            }
          />

          <Route
            path="/signin"
            element={
              <RedirectIfAuth>
                <Signin />
              </RedirectIfAuth>
            }
          />
          <Route
            path="/signup"
            element={
              <RedirectIfAuth>
                <Signup />
              </RedirectIfAuth>
            }
          />

          {/* Redirect root */}
          <Route path="/" element={<Navigate to="/signin" />} />

          {/* 404 Not Found */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
