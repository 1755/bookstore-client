import React from "react";
import { NavLink } from "react-router";

export function MainLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen">
      <div className="w-64 bg-gray-800 text-white flex flex-col">
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gray-600"></div>
            <div>
              <div className="font-medium">Super Adminer</div>
              <div className="text-sm text-gray-400">sudo@company.com</div>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4">
          <ul className="space-y-2">
            <li>
              <NavLink
                to="/books"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span>📚</span>
                <span>Books</span>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/authors"
                className={({ isActive }) =>
                  `flex items-center space-x-2 px-4 py-2 rounded hover:bg-gray-700 ${
                    isActive ? "bg-gray-700" : ""
                  }`
                }
              >
                <span>👥</span>
                <span>Authors</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>

      <div className="flex-1 overflow-auto">
        <div className="max-w-7xl mx-auto p-8">{children}</div>
      </div>
    </div>
  );
}
