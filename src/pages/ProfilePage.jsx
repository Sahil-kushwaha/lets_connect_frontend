import { useSelector } from "react-redux";

import ProfileEdit from "../components/ProfileEdit";
const ProfilePage = () => {
  const user = useSelector((state) => state.user);

  return <ProfileEdit userData={user} />;
};

export default ProfilePage;
