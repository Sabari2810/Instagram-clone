import React, { useContext, useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import FirebaseContext from "../context/firebase";
import * as routes from "../constants/routes";
import { doesUsernameExist } from "../services/firebase";

const SignUp = () => {
  const history = useHistory();
  const { firebase } = useContext(FirebaseContext);

  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");

  const isInvalid = password === "" || email === "";

  useEffect(() => {
    document.title = "Sign Up - Instagram";
  }, []);

  const handleSignUp = async (event) => {
    event.preventDefault();
    const usernameExists = await doesUsernameExist(username);
    // console.log(usernameExists);
    if (usernameExists) {
      setError("that username is already taken, try again.");
      return;
    }
    try {
      const createdUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      createdUser.user.updateProfile({
        displayName: username,
      });

      await firebase.firestore().collection("users").add({
        userId: createdUser.user.uid,
        username: username.toLowerCase(),
        fullName: fullname,
        emailAddress: email,
        dateCreated: Date.now(),
        followers: [],
        following: [],
      });

      history.push(routes.DASHBOARD);
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="container flex mx-auto justify-center items-center max-w-screen-md h-screen">
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
          <form onSubmit={handleSignUp} method="POST">
            <input
              type="text"
              placeholder="Enter your email address"
              className="px-4 py-5 w-full text-sm h-2 mr-3 mb-2 rounded border border-gray-primary"
              onChange={({ target }) => setEmail(target.value)}
              value={email}
            ></input>
            <input
              type="text"
              placeholder="Enter your username"
              className="px-4 py-5 w-full text-sm h-2 mr-3 mb-2 rounded border border-gray-primary"
              onChange={({ target }) => setUsername(target.value)}
              value={username}
            ></input>
            <input
              type="text"
              placeholder="Enter your fullname"
              className="px-4 py-5 w-full text-sm h-2 mr-3 mb-2 rounded border border-gray-primary"
              onChange={({ target }) => setFullname(target.value)}
              value={fullname}
            ></input>
            <input
              type="password"
              placeholder="Enter your password"
              className="px-4 py-5 w-full text-sm h-2 mr-3 mb-2 rounded border border-gray-primary"
              onChange={({ target }) => setPassword(target.value)}
              value={password}
            ></input>
            <button
              disabled={isInvalid}
              className={`bg-blue-medium text-white items-center w-full rounded h-8 font-bold ${
                isInvalid && "opacity-50"
              }`}
              type="submit"
            >
              Sign Up
            </button>
          </form>
        </div>
        <div className="flex flex-col border justify-center items-center border-gray-primary p-4 bg-white">
          <h1 className="text-sm">
            Have an account?{" "}
            <Link to="/login" className="font-bold text-blue-medium">
              Login
            </Link>
          </h1>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
