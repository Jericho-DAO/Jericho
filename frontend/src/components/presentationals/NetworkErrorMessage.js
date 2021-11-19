import React from "react";

export function NetworkErrorMessage({ message, dismiss }) {
  return (
    <div className="bg-red-300 p-2 pb-3 mt-4 mx-12 rounded" role="alert">
      {message}
      <button
        type="button"
        className="text-2xl pl-2"
        data-dismiss="alert"
        aria-label="Close"
        onClick={dismiss}
      >
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
  );
}
