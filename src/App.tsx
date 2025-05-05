import { Navigate, RouterProvider, createBrowserRouter } from 'react-router-dom';
import { Home, NotFound, Signin, Signup, UserDetails, Users } from './pages';
import { AuthLayout } from './layouts/AuthLayout';
import { RedirectIfAuth, RequireAuth } from './guard/AuthGuard';
import { useWindowSize } from './hooks/useWindowSize';
import { useAuth } from './hooks';

// TODO: Add route guards based on authentication state
// - If the user IS authenticated, prevent access to `/signin` and `/signup` routes
// - If the user is NOT authenticated, prevent access to `/home`, `/users`, and `/users/:id`
// - You can use a `PrivateRoute` or `RequireAuth` wrapper component for protected pages
// - Consider redirecting:
//    - Authenticated users from `/signin` or `/signup` → to `/home`
//    - Unauthenticated users from protected pages → to `/signin`


const router = createBrowserRouter([
  {
    path: '/',
    element: <Navigate to="/signin" />,
  },

  /*when authenticated */
  {
    path: '/home',
    element: (
      <RequireAuth>
        <AuthLayout><Home /></AuthLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/users',
    element: (
      <RequireAuth>
        <AuthLayout><Users /></AuthLayout>
      </RequireAuth>
    ),
  },
  {
    path: '/users/:id',
    element: (
      <RequireAuth>
        <AuthLayout><UserDetails /></AuthLayout>
      </RequireAuth>
    ),
  },
  /*  */

  /* PublicRoute unauthenticated users */
  {
    path: '/signin',
    element: (
      <RedirectIfAuth>
        <Signin />
      </RedirectIfAuth>
    ),
  },
  {
    path: '/signup',
    element: (
      <RedirectIfAuth>
        <Signup />
      </RedirectIfAuth>
    ),
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);


function App() {
  // TODO create useWindowSize custom hook, and store window size and device information in the redux utilsSlice.ts used detectDevice action
  // useWindowSize();
  useWindowSize()

  // Show a loading component while the system determines whether you are authenticated.
  const { isAuthenticated } = useAuth();

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  // const date1 = new Date('2025-05-01');
  // const date2 = new Date('2025-05-10');
  
  // const diff = date1.difference(date2);
  // console.log('Difference in days:', diff);
  
  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
