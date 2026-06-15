export type ContactRequest = {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  message: string;
  consent: boolean;
  website: string;
};

export type ContactResponse = {
  success: boolean;
  message?: string;
};
