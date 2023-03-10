import React from "react";
import { FaGithub, FaExternalLinkAlt, FaEdit } from "react-icons/fa";
import { IconContext } from "react-icons";

export default function ProjectCard(props) {
  return (
    <div className="relative block overflow-hidden rounded-lg border border-gray-100 p-4 sm:p-6 lg:p-8 shadow-xl w-full md:w-96">
      <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>

      <div className="flex justify-between items-center gap-4">
        <h3 className="text-lg font-bold text-gray-900 sm:text-xl">
          {props.title}
        </h3>
        <button type="button" title="Edit Project">
          <IconContext.Provider
            value={{
              className: "shared-className",
              size: 20,
            }}
          >
            <FaEdit />
          </IconContext.Provider>
        </button>
      </div>

      <div className="mt-4">
        <p className="max-w-[40ch] text-sm text-gray-500">
          {props.description}
        </p>
      </div>

      <dl className="mt-6 flex justify-between items-end gap-4 sm:gap-6">
        <div className="flex flex-col-reverse">
          <dt className="text-sm font-medium text-gray-600">Published</dt>
          <dd className="text-xs text-gray-500">{props.published}</dd>
        </div>
        <div className="flex gap-4">
          <a href={props.github} title="Github Link">
            <IconContext.Provider
              value={{
                className: "shared-className",
                size: 20,
              }}
            >
              <FaGithub />
            </IconContext.Provider>
          </a>
          <a href={props.live} title="Live Demo">
            <IconContext.Provider
              value={{
                className: "shared-className",
                size: 20,
              }}
            >
              <FaExternalLinkAlt />
            </IconContext.Provider>
          </a>
        </div>
      </dl>
    </div>
  );
}
