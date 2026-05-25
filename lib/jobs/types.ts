export type JobRow = {
  id: string;
  clerk_user_id: string;
  title: string;
  description: string;
  company_name: string;
  company_description: string | null;
  location: string;
  category_id: string | null;
  skills: string | null;
  job_type: string;
  is_remote: boolean;
  salary_text: string | null;
  poster_display_name: string | null;
  contact_phone: string | null;
  contact_whatsapp: string | null;
  created_at: string;
};

export type CreateJobState = {
  error: string | null;
};

export type UpdateJobContactState = {
  error: string | null;
  success: boolean;
};

export type DeleteJobState = {
  error: string | null;
};
