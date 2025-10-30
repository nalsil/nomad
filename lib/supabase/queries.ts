// Supabase 쿼리 함수 모음

import { createClient } from '@/utils/supabase/server'
import type {
  City,
  Review,
  ReviewWithRelations,
  CityRankingWithCity,
  RankingCategory,
  PostWithRelations,
} from './types'

// =====================================================
// Cities Queries
// =====================================================

/**
 * 모든 도시 조회
 */
export async function getCities(): Promise<City[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('views_count', { ascending: false })

  if (error) {
    console.error('Error fetching cities:', error)
    return []
  }

  return data || []
}

/**
 * 인기 도시 조회 (조회수 기준)
 */
export async function getPopularCities(limit: number = 8): Promise<City[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .order('views_count', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching popular cities:', error)
    return []
  }

  return data || []
}

/**
 * 특정 도시 조회 (ID)
 */
export async function getCityById(id: string): Promise<City | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('cities')
    .select('*')
    .eq('id', id)
    .single()

  if (error) {
    console.error('Error fetching city:', error)
    return null
  }

  return data
}

/**
 * 도시 조회수 증가
 */
export async function incrementCityViews(cityId: string): Promise<void> {
  const supabase = await createClient()

  const { error } = await supabase.rpc('increment_city_views', {
    city_uuid: cityId,
  })

  if (error) {
    console.error('Error incrementing city views:', error)
  }
}

// =====================================================
// Rankings Queries
// =====================================================

/**
 * 카테고리별 도시 랭킹 조회
 */
export async function getCityRankings(
  category: RankingCategory,
  limit: number = 10
): Promise<CityRankingWithCity[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('city_rankings')
    .select(`
      *,
      cities!city_rankings_city_id_fkey (*)
    `)
    .eq('category', category)
    .order('rank', { ascending: true })
    .limit(limit)

  if (error) {
    console.error('Error fetching city rankings:', error)
    return []
  }

  return data as CityRankingWithCity[]
}

/**
 * 특정 도시의 모든 랭킹 조회
 */
export async function getCityAllRankings(cityId: string) {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('city_rankings')
    .select('*')
    .eq('city_id', cityId)
    .order('date', { ascending: false })

  if (error) {
    console.error('Error fetching city all rankings:', error)
    return []
  }

  return data
}

// =====================================================
// Reviews Queries
// =====================================================

/**
 * 최신 리뷰 조회
 */
export async function getLatestReviews(limit: number = 6): Promise<ReviewWithRelations[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles!reviews_user_id_fkey (*),
      cities!reviews_city_id_fkey (*)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching latest reviews:', error)
    return []
  }

  return data as ReviewWithRelations[]
}

/**
 * 특정 도시의 리뷰 조회
 */
export async function getCityReviews(cityId: string): Promise<ReviewWithRelations[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles!reviews_user_id_fkey (*),
      cities!reviews_city_id_fkey (*)
    `)
    .eq('city_id', cityId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching city reviews:', error)
    return []
  }

  return data as ReviewWithRelations[]
}

/**
 * 사용자의 리뷰 조회
 */
export async function getUserReviews(userId: string): Promise<ReviewWithRelations[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles!reviews_user_id_fkey (*),
      cities!reviews_city_id_fkey (*)
    `)
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching user reviews:', error)
    return []
  }

  return data as ReviewWithRelations[]
}

/**
 * 특정 리뷰 조회
 */
export async function getReviewById(reviewId: string): Promise<ReviewWithRelations | null> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      *,
      profiles!reviews_user_id_fkey (*),
      cities!reviews_city_id_fkey (*)
    `)
    .eq('id', reviewId)
    .single()

  if (error) {
    console.error('Error fetching review:', error)
    return null
  }

  return data as ReviewWithRelations
}

// =====================================================
// Posts Queries
// =====================================================

/**
 * 최신 커뮤니티 게시글 조회
 */
export async function getLatestPosts(limit: number = 10): Promise<PostWithRelations[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!posts_user_id_fkey (*),
      cities!posts_city_id_fkey (*)
    `)
    .order('created_at', { ascending: false })
    .limit(limit)

  if (error) {
    console.error('Error fetching latest posts:', error)
    return []
  }

  return data as PostWithRelations[]
}

/**
 * 특정 도시 관련 게시글 조회
 */
export async function getCityPosts(cityId: string): Promise<PostWithRelations[]> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from('posts')
    .select(`
      *,
      profiles!posts_user_id_fkey (*),
      cities!posts_city_id_fkey (*)
    `)
    .eq('city_id', cityId)
    .order('created_at', { ascending: false })

  if (error) {
    console.error('Error fetching city posts:', error)
    return []
  }

  return data as PostWithRelations[]
}

// =====================================================
// Stats Queries
// =====================================================

/**
 * 전체 통계 조회
 */
export async function getGlobalStats() {
  const supabase = await createClient()

  const [citiesCount, reviewsCount, usersCount] = await Promise.all([
    supabase.from('cities').select('*', { count: 'exact', head: true }),
    supabase.from('reviews').select('*', { count: 'exact', head: true }),
    supabase.from('profiles').select('*', { count: 'exact', head: true }),
  ])

  return {
    cities: citiesCount.count || 0,
    reviews: reviewsCount.count || 0,
    users: usersCount.count || 0,
  }
}
