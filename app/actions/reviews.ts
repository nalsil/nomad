'use server'

import { revalidatePath } from 'next/cache'
import { createClient } from '@/utils/supabase/server'
import type { ReviewInsert, ReviewReactionInsert, ReactionType } from '@/lib/supabase/types'

/**
 * 리뷰 작성
 */
export async function createReview(data: {
  cityId: string
  rating: number
  title?: string
  content: string
}) {
  const supabase = await createClient()

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: '로그인이 필요합니다.' }
  }

  // 리뷰 데이터 준비
  const reviewData: ReviewInsert = {
    city_id: data.cityId,
    user_id: user.id,
    rating: data.rating,
    title: data.title || null,
    content: data.content,
  }

  // 리뷰 삽입
  const { data: review, error } = await supabase
    .from('reviews')
    .insert(reviewData)
    .select()
    .single()

  if (error) {
    console.error('Error creating review:', error)
    return { error: error.message }
  }

  // 해당 도시 페이지 재검증
  revalidatePath('/')
  revalidatePath(`/cities/${data.cityId}`)

  return { data: review }
}

/**
 * 리뷰 수정
 */
export async function updateReview(reviewId: string, data: {
  rating?: number
  title?: string
  content?: string
}) {
  const supabase = await createClient()

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: '로그인이 필요합니다.' }
  }

  // 리뷰 수정
  const { data: review, error } = await supabase
    .from('reviews')
    .update({
      ...data,
      updated_at: new Date().toISOString(),
    })
    .eq('id', reviewId)
    .eq('user_id', user.id) // 본인의 리뷰만 수정 가능
    .select()
    .single()

  if (error) {
    console.error('Error updating review:', error)
    return { error: error.message }
  }

  revalidatePath('/')

  return { data: review }
}

/**
 * 리뷰 삭제
 */
export async function deleteReview(reviewId: string) {
  const supabase = await createClient()

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: '로그인이 필요합니다.' }
  }

  // 리뷰 삭제
  const { error } = await supabase
    .from('reviews')
    .delete()
    .eq('id', reviewId)
    .eq('user_id', user.id) // 본인의 리뷰만 삭제 가능

  if (error) {
    console.error('Error deleting review:', error)
    return { error: error.message }
  }

  revalidatePath('/')

  return { success: true }
}

/**
 * 리뷰 반응 추가/변경 (좋아요, 싫어요, 도움돼요)
 */
export async function toggleReviewReaction(data: {
  reviewId: string
  reactionType: ReactionType
}) {
  const supabase = await createClient()

  // 사용자 인증 확인
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: '로그인이 필요합니다.' }
  }

  // 기존 반응 확인
  const { data: existingReaction } = await supabase
    .from('review_reactions')
    .select()
    .eq('review_id', data.reviewId)
    .eq('user_id', user.id)
    .eq('reaction_type', data.reactionType)
    .single()

  // 이미 같은 반응이 있으면 삭제 (토글)
  if (existingReaction) {
    const { error } = await supabase
      .from('review_reactions')
      .delete()
      .eq('id', existingReaction.id)

    if (error) {
      console.error('Error removing reaction:', error)
      return { error: error.message }
    }

    revalidatePath('/')
    return { success: true, action: 'removed' }
  }

  // 새 반응 추가
  const reactionData: ReviewReactionInsert = {
    review_id: data.reviewId,
    user_id: user.id,
    reaction_type: data.reactionType,
  }

  const { error } = await supabase
    .from('review_reactions')
    .insert(reactionData)

  if (error) {
    console.error('Error adding reaction:', error)
    return { error: error.message }
  }

  revalidatePath('/')
  return { success: true, action: 'added' }
}

/**
 * 사용자의 반응 상태 조회
 */
export async function getUserReactionStatus(reviewId: string) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { hasLiked: false, hasDisliked: false, hasHelpful: false }
  }

  const { data: reactions } = await supabase
    .from('review_reactions')
    .select('reaction_type')
    .eq('review_id', reviewId)
    .eq('user_id', user.id)

  const reactionTypes = reactions?.map(r => r.reaction_type) || []

  return {
    hasLiked: reactionTypes.includes('like'),
    hasDisliked: reactionTypes.includes('dislike'),
    hasHelpful: reactionTypes.includes('helpful'),
  }
}
