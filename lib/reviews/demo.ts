import type { ReviewRow } from "./types";

/** Sample reviews shown on the landing page (Nepal-focused). */
export const DEMO_REVIEWS: ReviewRow[] = [
  {
    id: "demo-sunita",
    clerk_user_id: null,
    author_name: "Sunita Sharma",
    author_role: "Staff Nurse · Kathmandu",
    rating: 5,
    body: "Rojgar Sathi helped me find a hospital role in Kathmandu within a few weeks. The listings were clear and the team replied quickly on the phone.",
    created_at: "2025-11-12T00:00:00.000Z",
  },
  {
    id: "demo-rajesh",
    clerk_user_id: null,
    author_name: "Rajesh Thapa",
    author_role: "Sales Executive · Pokhara",
    rating: 5,
    body: "I was looking for sales work in Pokhara and found several options here. Posting my CV details was simple and employers contacted me directly.",
    created_at: "2025-10-28T00:00:00.000Z",
  },
  {
    id: "demo-anita",
    clerk_user_id: null,
    author_name: "Anita Gurung",
    author_role: "HR Officer · Lalitpur",
    rating: 4,
    body: "We hired two team members through Rojgar Sathi. Good reach in Nepal and honest job descriptions—much better than random Facebook posts.",
    created_at: "2025-09-15T00:00:00.000Z",
  },
];
