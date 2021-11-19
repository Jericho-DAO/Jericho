import React from "react";

export function Loading() {
  return (
    <div className="flex h-screen">
      <div
        className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900 m-auto"
      ></div>
    </div>
  );
}
