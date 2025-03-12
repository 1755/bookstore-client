import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import type { Route } from "./+types/home";
import { useForm } from "react-hook-form";
import { useFetch } from "~/hooks";
import { NavLink } from "react-router";

type Inputs = {
  title: string;
  summary: string;
  publishedYear: number;
};

export default function Home({ params }: Route.ComponentProps) {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [apiError, setApiError] = useState("");
  const [success, setSuccess] = useState(false);
  const { loading, error, value } = useFetch(
    `${baseUrl}/v1/books/${params.id}`,
  );

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<Inputs>();

  useEffect(() => {
    setValue("title", value?.data?.attributes?.title);
    setValue("summary", value?.data?.attributes?.summary);
    setValue("publishedYear", value?.data?.attributes?.publishedYear);
  }, [value]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const response = await fetch(`${baseUrl}/v1/books/${params.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          data: {
            type: "books",
            id: params.id,
            attributes: data,
          },
        }),
      });

      if (response.ok) {
        setSuccess(true);
        setApiError("");
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
        <h1 className="text-2xl font-bold flex-1">Edit book</h1>
        <NavLink
          to="/books/"
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back to books
        </NavLink>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <form className="p-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700"
              >
                Title
              </label>

              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-2 py-2"
                // defaultValue={value?.data?.attributes?.title}
                {...register("title", {
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
                {errors.title && (
                  <span className="inline-block w-full bg-red-100 text-red-700 text-sm p-2 break-words">
                    {errors.title.message}
                  </span>
                )}
              </p>
            </div>

            <div>
              <label
                htmlFor="summary"
                className="block text-sm font-medium text-gray-700"
              >
                Summary
              </label>

              <textarea
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-2 py-2"
                rows={6}
                {...register("summary")}
              />
              <p className="mt-1 w-full">
                {errors.summary && (
                  <span className="inline-block w-full bg-red-100 text-red-700 text-sm p-2 break-words">
                    {errors.summary.message}
                  </span>
                )}
              </p>
            </div>

            <div>
              <label
                htmlFor="publishedYear"
                className="block text-sm font-medium text-gray-700"
              >
                Published Year
              </label>

              <input
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm px-2 py-2"
                {...register("publishedYear", {
                  required: "The field is required",
                  min: -100000,
                  max: 100000,
                  valueAsNumber: true,
                })}
              />

              <p className="mt-1 w-full">
                {errors.publishedYear && (
                  <span className="inline-block w-full bg-red-100 text-red-700 text-sm p-2 break-words">
                    {errors.publishedYear.message}
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
                value="Save Author"
              />
            </div>
            {success && (
              <div className="w-full bg-green-100 text-green-700 p-4 rounded-md">
                Book updated successfully! You can now manage this book from the
                authors list or create a new one.
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
