import React from 'react';
import { Routes, BrowserRouter, Route, Navigate } from 'react-router-dom';
import { Home, Signin, Signup, UserDetails, Users } from './pages';
import { Navbar } from './components/Navbar';

// TODO: Add route guards based on authentication state
// - If the user IS authenticated, prevent access to `/signin` and `/signup` routes
// - If the user is NOT authenticated, prevent access to `/home`, `/users`, and `/users/:id`
// - You can use a `PrivateRoute` or `RequireAuth` wrapper component for protected pages
// - Consider redirecting:
//    - Authenticated users from `/signin` or `/signup` → to `/home`
//    - Unauthenticated users from protected pages → to `/signin`

function App() {
  // TODO create useWindowSize custom hook, and store window size and device information in the redux utilsSlice.ts used detectDevice action
  // useWindowSize();

  // Show a loading component while the system determines whether you are authenticated.

  return (
    <div className="App">
      {/* TODO Create a layout for authenticated users, using the <Navbar /> component along with the page component. */}
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/users/id' element={<UserDetails />} />
          <Route path='/users' element={<Users />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/signin' element={<Signin />} />
          <Route path="" element={<Navigate to="/signin" />} />
          {/* TODO create a 404 not found page and show that for all routes that were not declared there */}
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
