import { Redirect, Route } from "react-router-dom";

const IsUserLoggedIn = ({ user, children, loggedInPath, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => {
        if (!user) {
          return children;
        }

        if (user) {
          return <Redirect to={{ pathname: loggedInPath }} />;
        }

        return null;
      }}
    />
  );
};

export default IsUserLoggedIn;
