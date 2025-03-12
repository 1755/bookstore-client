import React from "react";
import { type DocumentLinks } from "~/schemas";

interface PaginationProps {
  links?: DocumentLinks | null;
  onFirst: (url: URL) => void;
  onPrev: (url: URL) => void;
  onNext: (url: URL) => void;
}

export default function Pagination({
  links,
  onFirst,
  onPrev,
  onNext,
}: PaginationProps) {
  return (
    <div className="w-full flex items-center justify-between">
      {links && (
        <div>
          {links.first && (
            <button
              onClick={() => onFirst(new URL(links.first!))}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
            >
              First
            </button>
          )}
        </div>
      )}

      <div className="flex items-center space-x-3">
        <div className="flex items-center">
          {links && (links.prev || links.next) && (
            <div className="flex items-center space-x-1">
              {links.prev && (
                <button
                  onClick={() => onPrev(new URL(links.prev!))}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  « Previous
                </button>
              )}

              {links.next && (
                <button
                  onClick={() => onNext(new URL(links.next!))}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 cursor-pointer"
                >
                  Next »
                </button>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
