import useUser from "../../hooks/use-user";
import Suggestions from "./suggestions";
import User from "./user";

const Sidebar = () => {
  const {
    user: { fullName, username, userId, following, docId },
  } = useUser();

  return (
    <div>
      <User username={username} fullname={fullName} />
      <Suggestions userId={userId} following={following} userDocId={docId} />
    </div>
  );
};

export default Sidebar;
