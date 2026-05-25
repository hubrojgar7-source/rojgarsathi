"use client";

import { useCallback, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";

import { ReviewForm } from "./ReviewForm";

type Props = {
  open: boolean;
  onClose: () => void;
};

export function AddReviewModal({ open, onClose }: Props) {
  const router = useRouter();
  const dialogRef = useRef<HTMLDialogElement>(null);

  const handleSuccess = useCallback(() => {
    router.refresh();
    onClose();
  }, [onClose, router]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onCancel = (e: Event) => {
      e.preventDefault();
      onClose();
    };
    dialog.addEventListener("cancel", onCancel);
    return () => dialog.removeEventListener("cancel", onCancel);
  }, [onClose]);

  return (
    <dialog
      ref={dialogRef}
      className="w-[min(100%,28rem)] max-h-[90vh] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-0 shadow-xl backdrop:bg-slate-900/50 open:flex open:flex-col"
      onClose={onClose}
    >
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-100 bg-white px-5 py-4">
        <h3 className="text-lg font-semibold text-slate-900">Add your review</h3>
        <button
          type="button"
          onClick={onClose}
          className="rounded-lg p-2 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-700"
          aria-label="Close"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="px-5 py-5">
        <ReviewForm onSuccess={handleSuccess} inModal />
      </div>
    </dialog>
  );
}
