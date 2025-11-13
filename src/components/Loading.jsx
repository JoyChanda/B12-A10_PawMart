import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-transparent">
      <span className="loading loading-bars loading-xl">
        <style>
          {`
            .loading-bars span {
              background: linear-gradient(to top right, #fef3c7, #9a3412, #dc2626) !important;
            }
          `}
        </style>
      </span>
    </div>
  );
}
