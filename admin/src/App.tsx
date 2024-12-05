import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import ProtectedRoutes from './components/ProtectedRoutes';
import DefaultLayout from './layout/DefaultLayout';
import ResetPassword from './pages/Authentication/ResetPassword';
import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Fixtures from './pages/Dashboard/Fixtures';
import GetInTouch from './pages/Dashboard/GetInTouch';
import Leagues from './pages/Dashboard/Leagues';
import News from './pages/Dashboard/News';
import Players from './pages/Dashboard/Players';
function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return <Loader />;
  }

  return (
    <DefaultLayout>
      <Routes>
        <Route
          element={
            <>
              <ProtectedRoutes />
            </>
          }
        >
          <Route
            index
            element={
              <>
                <PageTitle title="Fixtures" />
                <Fixtures />
              </>
            }
          />
          <Route
            path="/players"
            element={
              <>
                <PageTitle title="Players" />
                <Players />
              </>
            }
          />
          <Route
            path="/news"
            element={
              <>
                <PageTitle title="News" />
                <News />
              </>
            }
          />
          <Route
            path="/leagues"
            element={
              <>
                <PageTitle title="Leagues" />
                <Leagues />
              </>
            }
          />
          <Route
            path="/get-in-touch"
            element={
              <>
                <PageTitle title="Get In Touch" />
                <GetInTouch />
              </>
            }
          />
        </Route>
        <Route
          path="/reset-password"
          element={
            <>
              <PageTitle title="Reset Password" />
              <ResetPassword />
            </>
          }
        />
        <Route
          path="/auth/signin"
          element={
            <>
              <PageTitle title="Signin | Admin Dashboard" />
              <SignIn />
            </>
          }
        />
        <Route
          path="/auth/signup"
          element={
            <>
              <PageTitle title="Signup | Admin Dashboard" />
              <SignUp />
            </>
          }
        />
      </Routes>
    </DefaultLayout>
  );
}

export default App;
