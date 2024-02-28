import Link from "next/link";
import React from "react";
import { RocketIcon, ReaderIcon } from "@radix-ui/react-icons";

const SideNavigation = () => {
  return (
    <aside className="w-3/12 border-r border-gray-300 h-screen p-4">
      <h1 className="font-bold text-lg">Portfolio Admin</h1>
      <span className="border-b mt-2 block"></span>
      <div className="mt-4">
        <ul>
          <li>
            <Link
              href={"/admin/projects"}
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2  rounded hover:text-gray-800 mb-2  "
            >
              <RocketIcon />
              Projects
            </Link>
          </li>
          <li>
            <Link
              href={"/admin/blogs"}
              className="flex items-center gap-2 text-gray-600 hover:bg-gray-100 px-3 py-2 rounded hover:text-gray-800"
            >
              <ReaderIcon />
              Blogs
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default SideNavigation;
