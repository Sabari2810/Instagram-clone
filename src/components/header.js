import { useContext } from "react";
import { Link } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import UserContext from "../context/user";
import * as routes from "../constants/routes";

const Header = () => {
  const { firebase } = useContext(FirebaseContext);
  const { user } = useContext(UserContext);

//   console.log(`user`, user);
  return (
    <header className="h-16 bg-white border-b border-gray-primary mb-8">
      <div className="mx-auto max-w-screen-lg h-full">
        <div className="flex justify-between h-full">
          <div className="text-center items-center flex">
            <h1 className="flex w-full justify-center items-center">
              <Link to={routes.DASHBOARD}>
                <img
                  src="/images/logo.png"
                  alt="logo"
                  className="w-6/12 mt-2"
                />
              </Link>
            </h1>
          </div>
          <div className="flex items-center align-items">
            {user ? (
              <>
                <Link to={routes.DASHBOARD}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-black-light mr-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                    />
                  </svg>
                </Link>
                <button onClick={() => firebase.auth().signOut()}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-8"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
                    />
                  </svg>
                </button>
                <div className="flex">
                  <Link to={`/p/${user.displayName}`}>
                    <img
                      src={`/images/avatars/${user.displayName}.jpg`}
                      className="rounded-full h-8 w-8"
                      alt={`${user.displayName}`}
                    />
                  </Link>
                </div>
              </>
            ) : (
              <>
                <Link to={routes.LOGIN}>
                    <button type="button" className="rounded font-bold bg-blue-medium text-sm w-20 text-white h-8">LogIn</button>
                </Link>
                <Link to={routes.SIGNUP}>
                    <button type="button" className="rounded font-bold text-blue-medium text-sm w-20 h-8">Sign Up</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
