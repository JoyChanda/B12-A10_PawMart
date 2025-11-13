import React from "react";

export default function Loading() {
  return (
    <div className="min-h-[40vh] flex items-center justify-center bg-transparent">
      <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary dark:border-orange-500 border-t-transparent"></div>
    </div>
  );
}
