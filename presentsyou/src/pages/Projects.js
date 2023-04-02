import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { MdAdd, MdClose } from "react-icons/md";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";
import { ReactSession } from "react-client-session";
import { IconContext } from "react-icons";

import ProjectCard from "../components/ProjectCard";

export default function Projects() {
  const navigate = useNavigate();
  const user = ReactSession.get("user");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const [live, setLive] = useState("");
  const [projects, setProjects] = useState([]);

  const [toggleModal, setToggleModal] = useState(true);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  });

  useEffect(() => {
    fetch("https://localhost:7054/api/Projects/GetProjectsByUserId/" + user.id)
      .then((res) => res.json())
      .then((data) => setProjects(data));
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    fetch("https://localhost:7054/api/Projects/PostProject", {
      method: "POST",
      crossDomain: true,
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "Access-Control-Allow-Origin": "*",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        date: month + " " + year,
        githubUrl: githubUrl,
        liveUrl: live,
        userId: user.id,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status === 400) {
          console.error("Error Occured");
        } else {
          console.info("Project Added");
          setToggleModal(true);
          navigate("/projects");
        }
      });
  };

  return (
    <>
      <div className="flex justify-between items-center">
        <p className="text-2xl font-semibold text-gray-700">Projects</p>
        <button
          className="flex items-center p-2 rounded-lg text-white bg-gradient-to-r from-blue-500 to-purple-600"
          type="button"
          onClick={() => setToggleModal(!toggleModal)}
        >
          <MdAdd />
          <span className="pl-2 text-base font-medium">Add Project</span>
        </button>
      </div>
      <hr className="my-2" />
      <div className="flex flex-wrap flex-col gap-2 md:flex-row">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            id={project.id}
            title={project.title}
            published={project.date}
            month={project.date.split(" ")[0]}
            year={project.date.split(" ")[1]}
            description={project.description}
            github={project.githubUrl}
            live={project.liveUrl}
          />
        ))}
      </div>

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
                Add New Project
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
                    Project Title
                  </label>
                  <input
                    type="text"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 "
                    required
                    autoComplete="email"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    Published
                  </label>
                  <div className="mt-2 flex gap-2">
                    <select
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5"
                      onChange={(e) => setMonth(e.target.value)}
                      value={month}
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
                      onChange={(e) => setYear(e.target.value)}
                      value={year}
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

                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Github Url
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IconContext.Provider
                        value={{
                          className: "shared-className",
                          size: 20,
                        }}
                      >
                        <FaGithub />
                      </IconContext.Provider>
                    </div>
                    <input
                      type="url"
                      value={githubUrl}
                      onChange={(e) => setGithubUrl(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    />
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block mb-2 text-sm font-medium text-gray-900">
                    Live Demo
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <IconContext.Provider
                        value={{
                          className: "shared-className",
                          size: 20,
                        }}
                      >
                        <FaExternalLinkAlt />
                      </IconContext.Provider>
                    </div>
                    <input
                      type="url"
                      value={live}
                      onChange={(e) => setLive(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full pl-10 p-2.5 "
                    />
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
