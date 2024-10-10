import React from "react";
import { auth } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import BackButton from "./BackButton";

const Profile = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="w-full max-w-sm mx-auto mt-10 px-4 sm:px-6 md:px-8 lg:px-0">
      <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
      <p className="mb-2">Name: {user?.displayName || "Anonymous"}</p>
      <p className="mb-2">Email: {user?.email}</p>
      {/*logic for favorite products*/}
      <BackButton />
    </div>
  );
};

export default Profile;
