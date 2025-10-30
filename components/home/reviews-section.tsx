import { ArrowRight, ThumbsUp, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import type { ReviewWithRelations } from "@/lib/supabase/types"

interface ReviewsSectionProps {
  initialReviews: ReviewWithRelations[]
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  const now = new Date()
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

  if (diffInHours < 1) return '방금 전'
  if (diffInHours < 24) return `${diffInHours}시간 전`
  if (diffInHours < 48) return '1일 전'

  return date.toLocaleDateString('ko-KR')
}

export function ReviewsSection({ initialReviews }: ReviewsSectionProps) {
  if (!initialReviews || initialReviews.length === 0) {
    return (
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold flex items-center gap-2 mb-8">
            ✍️ 최신 리뷰
          </h2>
          <div className="text-center py-12 text-muted-foreground">
            아직 리뷰가 없습니다. 첫 리뷰를 작성해보세요!
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            ✍️ 최신 리뷰
          </h2>
        </div>

        <div className="space-y-6">
          {initialReviews.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.profiles.avatar_url || undefined} />
                    <AvatarFallback>
                      {review.profiles.username?.[0]?.toUpperCase() || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">@{review.profiles.username || 'Anonymous'}</span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">{formatDate(review.created_at)}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">📍 {review.cities.name_ko}</span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                        <span className="text-sm font-medium ml-1">{review.rating}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {review.title && (
                  <h3 className="text-lg font-semibold mb-2">{review.title}</h3>
                )}
                <p className="text-base mb-4">{review.content}</p>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.likes_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>👎 {review.dislikes_count}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span>💡 도움돼요 {review.helpful_count}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
