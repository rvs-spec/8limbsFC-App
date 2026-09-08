// Hand-written to match supabase/migrations/0001_init.sql. If the schema
// changes, regenerate with `npx supabase gen types typescript` and reconcile.

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          name: string
          height_cm: number | null
          weight_kg: number | null
          age: number | null
          gender: 'male' | 'female' | null
          goal: 'lose' | 'maintain' | 'build' | 'performance' | null
          activity: 'light' | 'moderate' | 'active' | null
          calories: number | null
          protein: number | null
          carbs: number | null
          fat: number | null
          sessions_goal: number
          notifications_on: boolean
          created_at: string
          updated_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['profiles']['Row'], 'id'>> & { id: string }
        Update: Partial<Database['public']['Tables']['profiles']['Row']>
        Relationships: []
      }
      activity_history: {
        Row: {
          id: string
          user_id: string
          type: 'Run' | 'Walk'
          distance_km: number
          duration_sec: number
          calories: number
          occurred_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['activity_history']['Row'], 'id'>> & {
          user_id: string
          type: 'Run' | 'Walk'
          distance_km: number
          duration_sec: number
          calories: number
        }
        Update: Partial<Database['public']['Tables']['activity_history']['Row']>
        Relationships: []
      }
      workout_sessions: {
        Row: {
          id: string
          user_id: string
          name: string
          exercise_count: number
          duration_label: string
          occurred_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['workout_sessions']['Row'], 'id'>> & {
          user_id: string
          name: string
          exercise_count: number
          duration_label: string
        }
        Update: Partial<Database['public']['Tables']['workout_sessions']['Row']>
        Relationships: []
      }
      meals: {
        Row: {
          id: string
          user_id: string
          name: string
          kcal: number
          protein: number
          carbs: number
          fat: number
          logged_at: string
        }
        Insert: Partial<Omit<Database['public']['Tables']['meals']['Row'], 'id'>> & {
          user_id: string
          name: string
          kcal: number
          protein: number
          carbs: number
          fat: number
        }
        Update: Partial<Database['public']['Tables']['meals']['Row']>
        Relationships: []
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
  }
}
