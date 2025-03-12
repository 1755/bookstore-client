import { useState } from "react";
import { Link } from "react-router";
import { Pagination, ResourceActions } from "~/components";
import { useFetch } from "~/hooks";
import { type Resource, type Author } from "~/schemas";

function AuthorView({ author }: { author: Resource<Author> }) {
  return (
    <tr>
      <td className="py-3 px-4">
        <div className="flex-1 min-w-0 overflow-hidden">
          <div className="text-lg font-medium text-gray-900 truncate">
            {author.attributes.name}
          </div>
          <div className="text-sm text-gray-600 line-clamp-3">
            {author.attributes.bio}
          </div>
        </div>
      </td>
      <td className="py-3 px-4 whitespace-nowrap">
        <div>
          {new Date(author.attributes.updatedAt).toLocaleDateString("en-AU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </div>
        <div className="text-sm text-gray-500">
          {new Date(author.attributes.updatedAt).toLocaleTimeString("en-AU", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </td>
      <td className="py-3 px-4 text-right">
        <ResourceActions
          editTo={`/authors/${author.id}/edit`}
          deleteTo={`/authors/${author.id}/delete`}
        />
      </td>
    </tr>
  );
}

export default function Home() {
  const baseUrl = import.meta.env.VITE_API_BASE_URL;
  const [listURL, setListURL] = useState(
    new URL(`${baseUrl}/v1/authors/?page[limit]=25&sort=-updatedAt`),
  );

  const { loading, error, value } = useFetch(listURL, {}, [listURL]);

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Author Management</h1>
        <Link
          to="/authors/new"
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          New Author
        </Link>
      </div>

      <div className="bg-white shadow-sm rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium grow align-top">
                <div className="flex flex-col space-y-2">
                  <div className="flex items-center space-x-2">Author</div>
                </div>
              </th>
              <th className="text-left py-3 px-4 font-medium whitespace-nowrap align-top">
                <div className="flex items-center space-x-2">Updated At</div>
              </th>
              <th className="text-right py-3 px-4 font-medium w-24 align-top"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {!loading && (
              <>
                {value?.data.map((author) => (
                  <AuthorView key={author.id} author={author} />
                ))}
              </>
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        links={value?.links || null}
        onFirst={(url) => setListURL(url)}
        onPrev={(url) => setListURL(url)}
        onNext={(url) => setListURL(url)}
      />
    </div>
  );
}
