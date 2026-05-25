"use client";

import { useState } from "react";

import { AddReviewModal } from "./AddReviewModal";

export function AddReviewButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-sm shadow-blue-600/20 transition-colors hover:bg-blue-700"
      >
        Add review
      </button>
      <AddReviewModal open={open} onClose={() => setOpen(false)} />
    </>
  );
}
