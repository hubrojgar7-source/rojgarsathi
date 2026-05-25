"use client";

import { useEffect } from "react";

type Props = {
  shouldScroll: boolean;
};

export function ScrollToJobsOnSearch({ shouldScroll }: Props) {
  useEffect(() => {
    if (!shouldScroll) return;
    const el =
      document.getElementById("job-results") ??
      document.getElementById("categories");
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [shouldScroll]);

  return null;
}
