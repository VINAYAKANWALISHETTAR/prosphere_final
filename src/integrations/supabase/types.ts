export type Json = string | number | boolean | null | Json[] | { [key: string]: Json };

export type Database = {
  public: {
    Tables: {
      contact_messages: {
        Row: {
          created_at: string;
          email: string;
          message: string;
          name: string;
          id: string;
        };
        Insert: {
          created_at?: string;
          email: string;
          message: string;
          name: string;
        };
        Update: {
          created_at?: string;
          email?: string;
          message?: string;
          name?: string;
        };
      };
      project_requests: {
        Row: {
          additional_requirements: string | null;
          application_type: string | null;
          brand: string;
          budget: string | null;
          college_university: string | null;
          company: string | null;
          course: string | null;
          created_at: string;
          deadline: string | null;
          description: string;
          email: string;
          help_required: string | null;
          id: string;
          name: string;
          phone: string | null;
          project_stage: string | null;
          project_type: string;
          reference_id: string;
          specific_requirement: string | null;
          status: string;
          testing_authorized: boolean;
          timeline: string | null;
          user_type: string;
          website_url: string | null;
          year_of_study: string | null;
        };
        Insert: {
          additional_requirements?: string | null;
          application_type?: string | null;
          brand: string;
          budget?: string | null;
          college_university?: string | null;
          company?: string | null;
          course?: string | null;
          created_at?: string;
          deadline?: string | null;
          description: string;
          email: string;
          help_required?: string | null;
          name: string;
          phone?: string | null;
          project_stage?: string | null;
          project_type: string;
          reference_id: string;
          specific_requirement?: string | null;
          status?: string;
          testing_authorized?: boolean;
          timeline?: string | null;
          user_type: string;
          website_url?: string | null;
          year_of_study?: string | null;
        };
        Update: {
          additional_requirements?: string | null;
          application_type?: string | null;
          brand?: string;
          budget?: string | null;
          college_university?: string | null;
          company?: string | null;
          course?: string | null;
          created_at?: string;
          deadline?: string | null;
          description?: string;
          email?: string;
          help_required?: string | null;
          name?: string;
          phone?: string | null;
          project_stage?: string | null;
          project_type?: string;
          reference_id?: string;
          specific_requirement?: string | null;
          status?: string;
          testing_authorized?: boolean;
          timeline?: string | null;
          user_type?: string;
          website_url?: string | null;
          year_of_study?: string | null;
        };
      };
      content_items: {
        Row: {
          category: string | null;
          created_at: string;
          id: string;
          is_active: boolean;
          section: string;
          sort_order: number;
          src: string;
          title: string;
          type: string;
          updated_at: string;
        };
        Insert: {
          category?: string | null;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          section: string;
          sort_order?: number;
          src: string;
          title: string;
          type: string;
          updated_at?: string;
        };
        Update: {
          category?: string | null;
          created_at?: string;
          id?: string;
          is_active?: boolean;
          section?: string;
          sort_order?: number;
          src?: string;
          title?: string;
          type?: string;
          updated_at?: string;
        };
      };
    };
    Functions: {
      has_role: {
        Args: {
          _role: string;
          _user_id: string;
        };
        Returns: boolean;
      };
    };
  };
};
