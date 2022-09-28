import { lazy, React, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ReactLoader from "./components/loader";
import { AuthContextProvider } from "./context/AuthContext";
import * as ROUTES from "./constants/routes";

import ProtectedRoute from "./helpers/ProtectedRoute";

const Login = lazy(() => import("./pages/login"));
const Dashboard = lazy(() => import("./pages/dashboard"));
const Signup = lazy(() => import("./pages/signup"));
const Profile = lazy(() => import("./pages/profile"));
const NotFound = lazy(() => import("./pages/not-found"));

function App() {
  return (
    <Router>
      <Suspense fallback={<ReactLoader />}>
        <AuthContextProvider>
          <Routes>
            <Route path={ROUTES.LOGIN} element={<Login />} />
            <Route
              path={ROUTES.DASHBOARD}
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            {/* <Route path={ROUTES.DASHBOARD} element={<Dashboard />} /> */}

            <Route path={ROUTES.SIGN_UP} element={<Signup />} />
            <Route path={ROUTES.PROFILE} element={<Profile />} />
            <Route path={ROUTES.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </AuthContextProvider>
      </Suspense>
    </Router>
  );
}

export default App;
