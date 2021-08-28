import FirebaseContext from "../context/firebase";
import { useContext, useEffect, useState } from "react";

const useAuthListener = () => {
  const { firebase } = useContext(FirebaseContext);
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("authUser"))
  );

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged((authUser) => {
      if (authUser) {
        setUser(authUser);
        localStorage.setItem("authUser", JSON.stringify(authUser));
      } else {
        setUser(null);
      }
    });

    return () => listener;
  }, [firebase]);

  return { user };
};

export default useAuthListener;
