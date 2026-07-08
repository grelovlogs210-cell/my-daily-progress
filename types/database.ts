export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string | null;
          email: string | null;
          avatar_url: string | null;
          goal_type: string | null;
          current_weight_kg: number | null;
          target_weight_kg: number | null;
          height_cm: number | null;
          birth_date: string | null;
          sex: string | null;
          activity_level: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      daily_goals: {
        Row: {
          id: string;
          user_id: string;
          date: string;
          kcal_target: number | null;
          protein_g_target: number | null;
          carbs_g_target: number | null;
          fat_g_target: number | null;
          fiber_g_target: number | null;
          water_ml_target: number | null;
          created_at: string | null;
        };
      };
      meals: {
        Row: {
          id: string;
          user_id: string;
          analysis_job_id: string | null;
          title: string;
          meal_type: string | null;
          eaten_at: string | null;
          source: "photo" | "text" | "manual" | null;
          image_url: string | null;
          image_path: string | null;
          total_kcal: number | null;
          total_protein_g: number | null;
          total_carbs_g: number | null;
          total_fat_g: number | null;
          total_fiber_g: number | null;
          notes: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      meal_items: {
        Row: {
          id: string;
          meal_id: string;
          user_id: string;
          name: string;
          portion_label: string | null;
          portion_grams: number | null;
          quantity: number | null;
          kcal: number | null;
          protein_g: number | null;
          carbs_g: number | null;
          fat_g: number | null;
          fiber_g: number | null;
          confidence: number | null;
          source: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      habits: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          icon: string | null;
          unit: string | null;
          target_value: number | null;
          frequency: string | null;
          is_active: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      habit_logs: {
        Row: {
          id: string;
          habit_id: string;
          user_id: string;
          date: string;
          value: number | null;
          completed: boolean | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      weight_logs: {
        Row: {
          id: string;
          user_id: string;
          logged_at: string | null;
          weight_kg: number;
          body_fat_pct: number | null;
          waist_cm: number | null;
          note: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      water_logs: {
        Row: {
          id: string;
          user_id: string;
          logged_at: string | null;
          amount_ml: number;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      exercises: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          category: string | null;
          default_unit: string | null;
          calories_formula: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      workout_logs: {
        Row: {
          id: string;
          user_id: string;
          exercise_id: string | null;
          logged_at: string | null;
          duration_min: number | null;
          distance_km: number | null;
          sets: number | null;
          reps: number | null;
          weight_kg: number | null;
          calories_burned: number | null;
          notes: string | null;
          created_at: string | null;
          updated_at: string | null;
        };
      };
      food_analysis_jobs: {
        Row: {
          id: string;
          user_id: string;
          input_type: "photo" | "text" | null;
          image_path: string | null;
          input_text: string | null;
          status: "queued" | "processing" | "completed" | "failed" | null;
          model: string | null;
          raw_response: Json | null;
          normalized_result: Json | null;
          error_message: string | null;
          cost_estimate: number | null;
          created_at: string | null;
          completed_at: string | null;
        };
      };
    };
  };
};
