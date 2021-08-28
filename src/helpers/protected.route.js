import { Redirect, Route } from "react-router-dom";
import * as routes from "../constants/routes";

const ProtectedRoute = ({ user, children, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (user) {
          return children;
        }

        if (!user) {
          return <Redirect to={{ pathname: routes.LOGIN }} />;
        }

        return null;
      }}
    />
  );
};

export default ProtectedRoute;
