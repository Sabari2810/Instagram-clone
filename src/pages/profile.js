import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import { getUserByUsername } from "../services/firebase";
import * as Routes from "../constants/routes";
import Header from "../components/header";
import UserProfile from "../components/profile";
const Profile = () => {
  const { username } = useParams();
  const [user, setUser] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const checkUserNameExist = async () => {
      const user = await getUserByUsername(username);
      // console.log(`user`, user);
      if (user.length > 0) {
        setUser(user[0]);
      } else {
        history.push(Routes.NOT_FOUND);
      }
    };

    checkUserNameExist();
  }, [username, history]);

  return (
    <div className="bg-gray-background">
      <Header />
      <div className="max-w-screen-lg mx-auto">
        <UserProfile user={user} />
      </div>
    </div>
  );
};

export default Profile;
