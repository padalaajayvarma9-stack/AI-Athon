export interface User {
  id: string;
  email: string;
  name: string;
  created_at: string;
  preferences: UserPreferences;
}

export interface UserPreferences {
  notifications_enabled: boolean;
  reminder_time: string;
  theme: 'light' | 'dark' | 'auto';
  font_size: 'small' | 'medium' | 'large';
  privacy_level: 'private' | 'anonymous' | 'public';
}

export interface MoodEntry {
  id: string;
  user_id: string;
  date: string;
  mood_score: number; // 1-10 scale
  mood_emoji: string;
  energy_level: number; // 1-5 scale
  stress_level: number; // 1-5 scale
  sleep_hours?: number;
  activities: string[];
  notes?: string;
  sentiment_score?: number;
  created_at: string;
}

export interface JournalEntry {
  id: string;
  user_id: string;
  title?: string;
  content: string;
  sentiment_score: number; // -1 to 1
  sentiment_label: 'positive' | 'neutral' | 'negative';
  mood_score?: number;
  tags: string[];
  is_private: boolean;
  created_at: string;
  updated_at: string;
}

export interface WellnessRecommendation {
  id: string;
  user_id: string;
  type: 'exercise' | 'meditation' | 'activity' | 'tip';
  title: string;
  description: string;
  content: string;
  duration?: number; // in minutes
  difficulty: 'easy' | 'medium' | 'hard';
  category: string;
  personalization_factors: string[];
  is_completed: boolean;
  created_at: string;
}

export interface MoodTrend {
  date: string;
  mood_avg: number;
  energy_avg: number;
  stress_avg: number;
  sentiment_avg: number;
  entries_count: number;
}

export type ActivityType = 
  | 'exercise' 
  | 'work' 
  | 'social' 
  | 'relaxation' 
  | 'hobbies' 
  | 'outdoors' 
  | 'creative' 
  | 'learning';