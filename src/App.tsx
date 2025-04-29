import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Home, NotFound, Signin, Signup, UserDetails, Users } from './pages';
import { AuthLayout } from './layouts/AuthLayout';
import { RedirectIfAuth, RequireAuth } from './guard/AuthGuard';

function App() {
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
