import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { IconContext } from "react-icons";
import { MdAdd, MdClose } from "react-icons/md";
import { ReactSession } from "react-client-session";

import ExperienceCard from "../components/ExperienceCard";

export default function Experiences() {
  const navigate = useNavigate();
  const user = ReactSession.get("user");

  const [companyName, setCompanyName] = useState("");
  const [role, setRole] = useState("");
  const [description, setDescription] = useState("");
  const [startMonth, setStartMonth] = useState("");
  const [startYear, setStartYear] = useState("");
  const [endMonth, setEndMonth] = useState("");
  const [endYear, setEndYear] = useState("");
  const [experiences, setExperiences] = useState([]);

  const [toggleModal, setToggleModal] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    fetch(
      "https://localhost:7054/api/Experiences/GetExperiencesByUserId/" + user.id
    )
      .then((res) => res.json())
      .then((data) => setExperiences(data));
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("https://localhost:7054/api/Experiences/PostExperience", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        companyName: companyName,
        role: role,
        description: description,
        startDate: startMonth + " " + startYear,
        endDate: endMonth + " " + endYear,
        userId: user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          console.error("Error Occured");
        } else {
          console.log(data);
          console.info("Experience Added");
          setToggleModal(true);
          navigate("/experiences");
        }
      });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold text-gray-700">Experiences</p>
        <button
          className="flex items-center p-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600"
          type="button"
          onClick={() => setToggleModal(!toggleModal)}
        >
          <MdAdd />
          <span className="pl-2 text-base font-medium">Add Experience</span>
        </button>
      </div>
      <hr className="my-2" />
      <ul className="flex flex-col">
        {experiences.map((experience) => (
          <ExperienceCard
            key={experience.id}
            id={experience.id}
            companyName={experience.companyName}
            role={experience.role}
            description={experience.description}
            startMonth={experience.startDate.split(" ")[0]}
            startYear={experience.startDate.split(" ")[1]}
            endMonth={experience.endDate.split(" ")[0]}
            endYear={experience.endDate.split(" ")[1]}
          />
        ))}
      </ul>

      {/* <!-- Main modal --> */}
      <div
        id="staticModal"
        tabIndex="-1"
        aria-hidden="true"
        className={
          toggleModal
            ? "fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
            : "fixed top-0 left-0 right-0 z-50 block w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full"
        }
      >
        <div className="relative w-full h-full m-auto md:h-auto">
          {/* <!-- Modal content --> */}
          <div className="relative bg-white rounded-lg shadow max-w-lg ">
            {/* <!-- Modal header --> */}
            <div className="flex items-start justify-between p-4 border-b rounded-t ">
              <h3 className="text-xl font-semibold text-gray-900 ">
                Add New Experience
              </h3>
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
                onClick={() => setToggleModal(true)}
              >
                <IconContext.Provider
                  value={{
                    className: "shared-className",
                    size: 22,
                  }}
                >
                  <MdClose />
                </IconContext.Provider>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              {/* <!-- Modal body --> */}
              <div className="py-2 px-6 space-y-6">
                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Company Name
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    autoComplete="email"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Role
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    autoComplete="email"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Description
                  </label>
                  <textarea
                    required
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </div>

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    Start Date
                  </label>
                  <div className="mt-2 flex gap-2">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      onChange={(e) => setStartMonth(e.target.value)}
                      value={startMonth}
                    >
                      <option value="">--Select Month--</option>
                      <option value="Janaury">Janaury</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      onChange={(e) => setStartYear(e.target.value)}
                      value={startYear}
                    >
                      <option value="">--Select Year--</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2018">2016</option>
                      <option value="2019">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                    </select>
                  </div>
                </div>

                <div className="mt-2">
                  <label className="block mb-2 text-sm font-medium text-gray-900 ">
                    End Date
                  </label>
                  <div className="mt-2 flex gap-2">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      onChange={(e) => setEndMonth(e.target.value)}
                      value={endMonth}
                    >
                      <option value="">--Select Month--</option>
                      <option value="Janaury">Janaury</option>
                      <option value="February">February</option>
                      <option value="March">March</option>
                      <option value="April">April</option>
                      <option value="May">May</option>
                      <option value="June">June</option>
                      <option value="July">July</option>
                      <option value="August">August</option>
                      <option value="September">September</option>
                      <option value="October">October</option>
                      <option value="November">November</option>
                      <option value="December">December</option>
                    </select>

                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                      onChange={(e) => setEndYear(e.target.value)}
                      value={endYear}
                    >
                      <option value="">--Select Year--</option>
                      <option value="2023">2023</option>
                      <option value="2022">2022</option>
                      <option value="2021">2021</option>
                      <option value="2020">2020</option>
                      <option value="2019">2019</option>
                      <option value="2018">2018</option>
                      <option value="2017">2017</option>
                      <option value="2018">2016</option>
                      <option value="2019">2015</option>
                      <option value="2014">2014</option>
                      <option value="2013">2013</option>
                      <option value="2012">2012</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* <!-- Modal footer --> */}
              <div className="flex items-center p-6 space-x-2 border-t border-gray-200 rounded-b ">
                <button
                  type="submit"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
                >
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setToggleModal(true)}
                  className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
