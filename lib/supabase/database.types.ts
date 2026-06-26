export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          email: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          email: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          email?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      initiatives: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: "pending" | "process" | "completed";
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description: string;
          status?: "pending" | "process" | "completed";
          created_by?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string;
          status?: "pending" | "process" | "completed";
          created_by?: string | null;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "initiatives_created_by_fkey";
            columns: ["created_by"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
      initiative_volunteers: {
        Row: {
          initiative_id: string;
          volunteer_id: string;
          joined_at: string;
        };
        Insert: {
          initiative_id: string;
          volunteer_id: string;
          joined_at?: string;
        };
        Update: {
          initiative_id?: string;
          volunteer_id?: string;
          joined_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "initiative_volunteers_initiative_id_fkey";
            columns: ["initiative_id"];
            referencedRelation: "initiatives";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "initiative_volunteers_volunteer_id_fkey";
            columns: ["volunteer_id"];
            referencedRelation: "profiles";
            referencedColumns: ["id"];
          },
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
};
