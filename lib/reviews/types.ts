export type ReviewRow = {
  id: string;
  clerk_user_id: string | null;
  author_name: string;
  author_role: string | null;
  rating: number;
  body: string;
  created_at: string;
};

export type CreateReviewState = {
  error?: string;
  success?: boolean;
};
