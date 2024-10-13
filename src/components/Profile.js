import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebaseConfig";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import BackButton from "./BackButton";
import { ThemeContext } from "../App";

const Profile = () => {
  const [user] = useAuthState(auth);
  const [favorites, setFavorites] = useState([]);
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    if (user) {
      const fetchFavorites = async () => {
        const q = query(
          collection(db, "favorites"),
          where("userId", "==", user.uid)
        );
        const querySnapshot = await getDocs(q);
        const favoritesList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setFavorites(favoritesList);
      };
      fetchFavorites();
    }
  }, [user]);

  const handleRemoveFavorite = async (id) => {
    await deleteDoc(doc(db, "favorites", id));
    setFavorites(favorites.filter((favorite) => favorite.id !== id));
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center px-2 lg:px-6 ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
      }`}
    >
      <div className={`w-full mt-4 px-4 sm:px-6 md:px-8 mb-6`}>
        <h2 className="text-2xl font-semibold mb-4 text-center">Profile</h2>
        <p className="mb-2">
          <span className="font-semibold">Name :</span>{" "}
          {user?.displayName || "Anonymous"}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Email :</span> {user?.email}
        </p>
        <h3 className="text-xl font-semibold mt-4">Favorite Products</h3>

        <div
          className={`flex flex-wrap mb-4 gap-4 my-4 ${
            theme === "dark" ? "text-white" : "text-black"
          }`}
        >
          {favorites.length === 0 ? (
            <p>No favorite products yet.</p>
          ) : (
            favorites.map((favorite) => (
              <div
                key={favorite.id}
                className="w-full sm:w-[45%] md:w-[30%] lg:w-[22%] xl:w-[18%] p-4 rounded-lg shadow-lg flex flex-col"
                style={{
                  backgroundColor: theme === "dark" ? "#374151" : "#D1D5DB",
                }}
              >
                <div className="flex-1 flex justify-center items-center overflow-hidden rounded-lg bg-gray-200">
                  <img
                    src={favorite.image}
                    className="max-h-60 object-contain object-center"
                    alt={favorite.name}
                  />
                </div>

                <div className="p-2">
                  <h3 className="font-bold text-lg">{favorite.name}</h3>
                  <p
                    className={`${
                      theme === "dark" ? "text-zinc-200" : "text-zinc-800"
                    }`}
                  >
                    {favorite.price}
                  </p>
                  <a
                    className="text-blue-500 text-sm mr-4"
                    href={favorite.link}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Link
                  </a>

                  <button
                    onClick={() => handleRemoveFavorite(favorite.id)}
                    className="mt-4 text-red-500"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        <BackButton />
      </div>
    </div>
  );
};

export default Profile;
