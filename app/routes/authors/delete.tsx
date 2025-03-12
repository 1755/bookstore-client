import type { Route } from "./+types/home";
import { NavLink, useNavigate } from "react-router";

export default function Home({ params }: Route.ComponentProps) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const navigate = useNavigate();

  return (
    <div className="w-full bg-red-100 text-red-700 p-4 rounded-md">
      <div>Are you sure?</div>
      <div className="flex justify-end gap-2 mt-3">
        <NavLink
          to="/authors"
          className="px-4 py-2 border border-gray-400 text-gray-700 rounded-md hover:bg-gray-100"
        >
          Cancel
        </NavLink>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
          onClick={async () => {
            const response = await fetch(`${baseUrl}/v1/authors/${params.id}`, {
              method: "DELETE",
            });
            if (response.ok) {
              alert("Author deleted successfully!");
              navigate("/authors");
            } else {
              alert("Failed to delete author. Please try again.");
            }
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
