// Supabase 데이터베이스 타입 정의

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: Profile
        Insert: ProfileInsert
        Update: ProfileUpdate
      }
      cities: {
        Row: City
        Insert: CityInsert
        Update: CityUpdate
      }
      reviews: {
        Row: Review
        Insert: ReviewInsert
        Update: ReviewUpdate
      }
      review_reactions: {
        Row: ReviewReaction
        Insert: ReviewReactionInsert
        Update: ReviewReactionUpdate
      }
      city_rankings: {
        Row: CityRanking
        Insert: CityRankingInsert
        Update: CityRankingUpdate
      }
      posts: {
        Row: Post
        Insert: PostInsert
        Update: PostUpdate
      }
    }
  }
}

// Profile Types
export interface Profile {
  id: string
  username: string | null
  avatar_url: string | null
  bio: string | null
  created_at: string
  updated_at: string
}

export interface ProfileInsert {
  id: string
  username?: string | null
  avatar_url?: string | null
  bio?: string | null
}

export interface ProfileUpdate {
  username?: string | null
  avatar_url?: string | null
  bio?: string | null
  updated_at?: string
}

// City Types
export interface City {
  id: string
  name_ko: string
  name_en: string
  country: string
  description: string | null
  image_url: string | null
  cost_index: number
  internet_speed: number
  safety_score: number
  weather_score: number
  latitude: number | null
  longitude: number | null
  location: unknown // PostGIS GEOGRAPHY type
  views_count: number
  reviews_count: number
  avg_rating: number
  created_at: string
  updated_at: string
}

export interface CityInsert {
  name_ko: string
  name_en: string
  country: string
  description?: string | null
  image_url?: string | null
  cost_index?: number
  internet_speed?: number
  safety_score?: number
  weather_score?: number
  latitude?: number | null
  longitude?: number | null
}

export interface CityUpdate {
  name_ko?: string
  name_en?: string
  country?: string
  description?: string | null
  image_url?: string | null
  cost_index?: number
  internet_speed?: number
  safety_score?: number
  weather_score?: number
  latitude?: number | null
  longitude?: number | null
  updated_at?: string
}

// Review Types
export interface Review {
  id: string
  city_id: string
  user_id: string
  rating: number
  title: string | null
  content: string
  likes_count: number
  dislikes_count: number
  helpful_count: number
  created_at: string
  updated_at: string
}

export interface ReviewInsert {
  city_id: string
  user_id: string
  rating: number
  title?: string | null
  content: string
}

export interface ReviewUpdate {
  rating?: number
  title?: string | null
  content?: string
  updated_at?: string
}

// Review with related data
export interface ReviewWithRelations extends Review {
  profiles: Profile
  cities: City
}

// Review Reaction Types
export type ReactionType = 'like' | 'dislike' | 'helpful'

export interface ReviewReaction {
  id: string
  review_id: string
  user_id: string
  reaction_type: ReactionType
  created_at: string
}

export interface ReviewReactionInsert {
  review_id: string
  user_id: string
  reaction_type: ReactionType
}

export interface ReviewReactionUpdate {
  reaction_type?: ReactionType
}

// City Ranking Types
export type RankingCategory = 'overall' | 'cost' | 'internet' | 'safety' | 'weather'

export interface CityRanking {
  id: string
  city_id: string
  category: RankingCategory
  rank: number
  score: number
  date: string
  created_at: string
}

export interface CityRankingInsert {
  city_id: string
  category: RankingCategory
  rank: number
  score: number
  date?: string
}

export interface CityRankingUpdate {
  rank?: number
  score?: number
  date?: string
}

// Ranking with city data
export interface CityRankingWithCity extends CityRanking {
  cities: City
}

// Post Types
export interface Post {
  id: string
  user_id: string
  city_id: string | null
  title: string
  content: string
  views_count: number
  comments_count: number
  likes_count: number
  created_at: string
  updated_at: string
}

export interface PostInsert {
  user_id: string
  city_id?: string | null
  title: string
  content: string
}

export interface PostUpdate {
  city_id?: string | null
  title?: string
  content?: string
  updated_at?: string
}

// Post with related data
export interface PostWithRelations extends Post {
  profiles: Profile
  cities: City | null
}
