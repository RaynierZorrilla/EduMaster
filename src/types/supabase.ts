export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          username: string
          avatar_url: string | null
          level: number
          points: number
          created_at: string
        }
        Insert: {
          id: string
          email: string
          username: string
          avatar_url?: string | null
          level?: number
          points?: number
          created_at?: string
        }
        Update: {
          id?: string
          email?: string
          username?: string
          avatar_url?: string | null
          level?: number
          points?: number
          created_at?: string
        }
      }
      courses: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          category: string
          level: string
          duration: number
          modules: number
          rating: number
          enrolled: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          category: string
          level: string
          duration: number
          modules: number
          rating?: number
          enrolled?: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          category?: string
          level?: string
          duration?: number
          modules?: number
          rating?: number
          enrolled?: number
          created_at?: string
        }
      }
      user_progress: {
        Row: {
          user_id: string
          course_id: string
          completed_modules: number
          total_modules: number
          last_accessed_at: string
        }
        Insert: {
          user_id: string
          course_id: string
          completed_modules: number
          total_modules: number
          last_accessed_at?: string
        }
        Update: {
          user_id?: string
          course_id?: string
          completed_modules?: number
          total_modules?: number
          last_accessed_at?: string
        }
      }
      achievements: {
        Row: {
          id: string
          title: string
          description: string
          image_url: string
          points: number
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          image_url: string
          points: number
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          image_url?: string
          points?: number
          created_at?: string
        }
      }
      user_achievements: {
        Row: {
          user_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          user_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          user_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
      project_shares: {
        Row: {
          id: string
          user_id: string
          title: string
          description: string
          image_url: string | null
          course_id: string | null
          likes: number
          comments: number
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          description: string
          image_url?: string | null
          course_id?: string | null
          likes?: number
          comments?: number
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          description?: string
          image_url?: string | null
          course_id?: string | null
          likes?: number
          comments?: number
          created_at?: string
        }
      }
    }
  }
}