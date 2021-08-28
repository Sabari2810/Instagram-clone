import { useEffect, useContext, useState } from "react";
import UserContext from "../context/user";
import { getUserById } from "../services/firebase";

const useUser = () => {

  const { user } = useContext(UserContext);
  const [activeUser, setActiveUser] = useState({});


  useEffect(() => {
    const getUserObjectById = async(userId) => {
      const [res] = await getUserById(userId);
      setActiveUser(res);
    };

    if (user?.uid) {
      getUserObjectById(user.uid);
    }
  }, [user]);

  return { user: activeUser };
};

export default useUser;
