import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import * as Routes from "./constants/routes";
import UserContext from "./context/user";
import IsUserLoggedIn from "./helpers/is-user-logged-in";
import ProtectedRoute from "./helpers/protected.route";
import useAuthListener from "./hooks/use-auth-listener";
import "./styles/app.css";

const Login = lazy(() => import("./pages/login"));
const SignUp = lazy(() => import("./pages/sign-up"));
const NotFound = lazy(() => import("./pages/not-found"));
const Dashboard = lazy(() => import("./pages/dashboard"));

const App = () => {
  const { user } = useAuthListener();

  return (
    <UserContext.Provider value={{ user }}>
      <Router>
        <Suspense fallback={<p>Loading...</p>}>
          <Switch>
            <IsUserLoggedIn
              loggedInPath={Routes.DASHBOARD}
              user={user}
              path={Routes.LOGIN}
            >
              <Login />
            </IsUserLoggedIn>
            <IsUserLoggedIn
              loggedInPath={Routes.DASHBOARD}
              user={user}
              path={Routes.SIGNUP}
            >
              <SignUp />
            </IsUserLoggedIn>
            <ProtectedRoute path={Routes.DASHBOARD} user={user} exact>
              <Dashboard />
            </ProtectedRoute>
            <Route component={NotFound}></Route>
          </Switch>
        </Suspense>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
