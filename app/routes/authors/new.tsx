import { NavLink } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import React, { useState } from "react";


type Inputs = {
  name: string;
  bio: string;
};

export default function Home() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/v1/authors/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            type: "authors",
            attributes: data,
          },
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setApiError("");
        reset();
      } else if (response.status === 400) {
        const errorData = await response.json();
        setApiError(JSON.stringify(errorData));
      } else {
        throw new Error("Server error");
      }
    } catch (error) {
      alert("Failed to create author. Please try again.");
      console.error("Error:", error);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex-1">Create new author</h1>
        <NavLink
          to="/authors/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to authors
        </NavLink>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700"
              >
                Name
              </label>

              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-2 py-2"
                {...register("name", {
                  required: "The field is required",
                  minLength: {
                    value: 0,
                    message: "Name must be at least 1 character",
                  },
                  maxLength: {
                    value: 150,
                    message: "Name must be less than 150 characters",
                  },
                })}
              />

              <p className="mt-1 w-full">
                {errors.name && (
                  <span className="inline-block w-full bg-red-100 text-red-700 text-sm p-2 break-words">
                    {errors.name.message}
                  </span>
                )}
              </p>
            </div>

            <div>
              <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
              >
                Biography
              </label>

              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-2 py-2"
                rows={6}
                {...register("bio")}
              />
              <p className="mt-1 w-full">
                {errors.bio && (
                  <span className="inline-block w-full bg-red-100 text-red-700 text-sm p-2 break-words">
                    {errors.bio.message}
                  </span>
                )}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex justify-end">
              <input
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
                value="Create Author"
              />
            </div>
            {success && (
              <div className="w-full bg-green-100 text-green-700 p-4 rounded-md">
                Author created successfully! You can now manage this author from
                the authors list or create a new one.
              </div>
            )}
            {apiError && (
              <div className="w-full bg-red-100 text-red-700 p-4 rounded-md">
                {apiError}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
