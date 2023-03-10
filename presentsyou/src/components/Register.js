import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("Male");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [statusError, setStatusError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://localhost:7054/Register", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        firstName: firstName,
        lastName: lastName,
        gender: gender,
        githubProfile: "",
        linkedInProfile: "",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          console.log("Email already in use");
          setStatusError("There exist an account on given email");
        } else {
          console.log("Sign Up successful");
          setStatusError("");
          navigate("/login");
        }
      });
  };

  return (
    <div className="flex max-w-lg mx-auto my-16 overflow-hidden bg-white rounded-lg lg:space-x-8 lg:max-w-5xl">
      <div className="items-center hidden lg:flex lg:w-1/2">
        <img src="register_illu.jpg" alt="secure-login-animate.svg" />
      </div>

      <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
        <h2 className="text-2xl font-semibold text-center text-gray-700 ">
          Welcome
        </h2>

        <p className="mt-2 text-xl text-center text-gray-600 ">
          Are you <span className="text-indigo-700 ">Ready?</span>
        </p>

        {statusError !== "" && (
          <div className="my-4 px-4 py-2 border border-red-700 bg-red-200 text-center rounded-lg">
            <p className="text-red-700">{statusError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mt-4 flex gap-2">
            <div className="">
              <label className="block mb-2 text-sm text-gray-600 ">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="">
              <label className="block mb-2 text-sm text-gray-600 ">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="mt-2 flex gap-4">
            <label className="block text-md text-gray-600 ">Gender</label>
            <div className="flex">
              <input
                type="radio"
                name="gender"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none"
                checked={gender === "Male"}
                onChange={() => setGender("Male")}
              />
              <span className="px-1 text-gray-700">Male</span>
            </div>
            <div className="flex">
              <input
                type="radio"
                name="gender"
                className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none"
                checked={gender === "Female"}
                onChange={() => setGender("Female")}
              />
              <span className="px-1 text-gray-700">Female</span>
            </div>
          </div>

          <div className="mt-2">
            <label className="block mb-2 text-sm text-gray-600 ">
              E-Mail Address
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
              required
              autoComplete="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mt-4">
            <label className="block mb-2 text-sm text-gray-600 ">
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full px-4 py-2 text-gray-700 bg-white border border-gray-200 rounded-lg  focus:outline-none focus:ring focus:ring-primary  focus:ring-opacity-20"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="mt-8">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform rounded-md bg-indigo-700 hover:bg-indigo-700 /70 focus:outline-none focus:bg-indigo-700 /70"
            >
              Sign Up
            </button>
          </div>
        </form>

        <div className="flex items-center justify-between mt-4">
          <span className="w-1/5 border-b  md:w-1/4"></span>

          <Link
            to="/login"
            className="text-xs text-gray-500 uppercase  hover:underline"
          >
            Already have an Account?
          </Link>

          <span className="w-1/5 border-b  md:w-1/4"></span>
        </div>
      </div>
    </div>
  );
}
