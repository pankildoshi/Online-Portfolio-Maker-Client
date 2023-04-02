import React, { useEffect, useState } from "react";
import { ReactSession } from "react-client-session";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const user = ReactSession.get("user");

  const [profile, setProfile] = useState(null);
  const [publicVisiblity, setPublicVisiblity] = useState(false);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
    var profileId =
      user.firstName.toLowerCase() +
      "-" +
      user.lastName.toLowerCase() +
      "-" +
      user.id;

    fetch(`https://localhost:7054/api/Profile/GetProfile/${profileId}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setPublicVisiblity(profile.status);
      });
  }, []);

  const handleUpdate = (newProfile) => {
    fetch(`https://localhost:7054/api/Profile/PutProfile/${newProfile.id}`, {
      method: "PUT",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify(newProfile),
    })
      .then((res) => res.json())
      .then((data) => {
        alert("Updated Successfully.");
      });
  };

  const handleVisibilityChange = () => {
    setPublicVisiblity(!publicVisiblity);
    setProfile((prev) => ({
      ...prev,
      ["status"]: publicVisiblity ? "Public" : "Private",
    }));

    handleUpdate(profile);
    console.log(profile);
  };

  return (
    <>
      <div className="flex justify-start items-center">
        <p className="text-2xl font-semibold text-gray-700">Public Profile</p>
        <label className="relative h-6 w-10 cursor-pointer mx-3">
          <input
            type="checkbox"
            className="peer sr-only"
            checked={publicVisiblity}
            onChange={handleVisibilityChange}
          />
          <span className="absolute inset-0 rounded-full bg-gray-300 transition peer-checked:bg-green-500"></span>
          <span className="absolute inset-0 m-1 h-4 w-4 rounded-full bg-white transition peer-checked:translate-x-4"></span>
        </label>
      </div>
      <hr className="my-2" />

      {publicVisiblity ? (
        <div>
          <div className="bg-gray-100 px-4 py-2 rounded-lg">
            <p className="text-gray-700 font-normal text-sm">
              Your public profile url
            </p>
            <a
              href={`http://localhost:3000/profile/${user.firstName}-${user.lastName}-${user.id}`}
              target="_blank"
              className="underline text-blue-500"
            >
              {`http://localhost:3000/profile/${user.firstName}-${user.lastName}-${user.id}`}
            </a>
          </div>
          <div className="">
            <div className="mt-2">
              <label className="block mb-2 text-sm font-medium text-gray-900 ">
                Choose your profile template
              </label>
              <select
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full max-w-sm p-2.5 focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                value={profile.template}
                onChange={() => {}}
              >
                <option value="Classic">Classic</option>
              </select>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center">
          <p className="text-lg text-center text-gray-700 font-semibold">
            Activate your public profile to make it publicly accessible.
          </p>
        </div>
      )}
    </>
  );
}
