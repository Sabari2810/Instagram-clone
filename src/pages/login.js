import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as routes from "../constants/routes";

const Login = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setloading] = useState(false);

  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  useEffect(() => {
    document.title = "Login - Instagram";
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      setloading(true);
      await firebase.auth().signInWithEmailAndPassword(email, password);
      setloading(false);
      setEmail("");
      setPassword("");
      history.push(routes.DASHBOARD);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto items-center max-w-screen-md h-screen">
      <div className="flex w-3/5">
        <img src="/images/iphone-with-profile.jpg" alt="iphone-bg-img" />
      </div>
      <div className="flex flex-col w-2/5">
        <div className="flex flex-col bg-white p-4 border border-gray-primary mb-4">
          <h1 className="flex w-full justify-center">
            <img
              src="/images/logo.png"
              alt="logo"
              className="w-6/12 mt-2 mb-4"
            />
          </h1>

          {error && <p className="mb-3 text-red-primary text-xs">{error}</p>}
          <form onSubmit={handleLogin} method="POST">
            <input
              type="text"
              placeholder="Enter your email address"
              className="px-4 py-5 w-full text-sm h-2 mr-3 mb-2 rounded border border-gray-primary"
              onChange={({ target }) => setEmail(target.value)}
            ></input>
            <input
              type="password"
              placeholder="Enter your password"
              className="px-4 py-5 w-full text-sm h-2 mr-3 mb-2 rounded border border-gray-primary"
              onChange={({ target }) => setPassword(target.value)}
            ></input>
            <button
            
              disabled={isInvalid}
              className={`bg-blue-medium text-white items-center w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
              type="submit"
              
            >
              {!loading ? "Login" : <i className="fa fa-refresh fa-spin"></i>}
              {/* {!loading ? "Login" : "Login2"} */}
            </button>
          </form>
        </div>
        <div className="flex flex-col border justify-center items-center border-gray-primary p-4 bg-white">
          <h1 className="text-sm">
            Don't have an account?{" "}
            <Link to="/sign-up" className="font-bold text-blue-medium">
              Sign up
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Login;
