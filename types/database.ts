export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      contact_rate_limits: {
        Row: {
          ip_hash: string;
          last_request_at: string;
          request_count: number;
          window_start: string;
        };
        Insert: {
          ip_hash: string;
          last_request_at?: string;
          request_count?: number;
          window_start?: string;
        };
        Update: {
          ip_hash?: string;
          last_request_at?: string;
          request_count?: number;
          window_start?: string;
        };
        Relationships: [];
      };
      leads: {
        Row: {
          company: string | null;
          consent: boolean;
          created_at: string;
          crm_external_id: string | null;
          crm_provider: string | null;
          crm_synced_at: string | null;
          email: string;
          email_notification_error: string | null;
          email_notification_status: string;
          id: string;
          ip_hash: string | null;
          message: string;
          metadata: Json;
          name: string;
          phone: string | null;
          referrer: string | null;
          source: string;
          status: string;
          user_agent: string | null;
        };
        Insert: {
          company?: string | null;
          consent?: boolean;
          created_at?: string;
          crm_external_id?: string | null;
          crm_provider?: string | null;
          crm_synced_at?: string | null;
          email: string;
          email_notification_error?: string | null;
          email_notification_status?: string;
          id?: string;
          ip_hash?: string | null;
          message: string;
          metadata?: Json;
          name: string;
          phone?: string | null;
          referrer?: string | null;
          source?: string;
          status?: string;
          user_agent?: string | null;
        };
        Update: {
          company?: string | null;
          consent?: boolean;
          created_at?: string;
          crm_external_id?: string | null;
          crm_provider?: string | null;
          crm_synced_at?: string | null;
          email?: string;
          email_notification_error?: string | null;
          email_notification_status?: string;
          id?: string;
          ip_hash?: string | null;
          message?: string;
          metadata?: Json;
          name?: string;
          phone?: string | null;
          referrer?: string | null;
          source?: string;
          status?: string;
          user_agent?: string | null;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: {
      check_contact_rate_limit: {
        Args: {
          p_ip_hash: string;
          p_limit?: number;
          p_window_seconds?: number;
        };
        Returns: {
          allowed: boolean;
          remaining: number;
          reset_at: string;
        }[];
      };
    };
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type ContactRateLimitResult =
  Database["public"]["Functions"]["check_contact_rate_limit"]["Returns"][number];
