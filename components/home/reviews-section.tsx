import { ArrowRight, ThumbsUp, MessageCircle, Share2, Star } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { MOCK_REVIEWS } from "@/lib/constants"

export function ReviewsSection() {
  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            ✍️ 최신 리뷰
          </h2>
          <button
            disabled
            className="text-sm font-medium text-muted-foreground cursor-not-allowed flex items-center gap-1 opacity-60"
          >
            더 많은 리뷰
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-6">
          {MOCK_REVIEWS.map((review) => (
            <Card key={review.id}>
              <CardContent className="p-6">
                <div className="flex items-start gap-4 mb-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={review.author.avatarUrl} />
                    <AvatarFallback>{review.author.username[0].toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-semibold">@{review.author.username}</span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">{review.author.job}</span>
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">{review.createdAt}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm font-medium">📍 {review.cityName}</span>
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
                      <span className="text-sm text-muted-foreground">·</span>
                      <span className="text-sm text-muted-foreground">{review.duration} 거주</span>
                    </div>
                  </div>
                </div>

                <p className="text-base mb-4 font-medium">&ldquo;{review.summary}&rdquo;</p>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">💰 가성비</span>
                      <span className="text-sm font-medium">{review.categoryRatings.value.toFixed(1)}</span>
                    </div>
                    <Progress value={review.categoryRatings.value * 20} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">📡 인터넷</span>
                      <span className="text-sm font-medium">{review.categoryRatings.internet.toFixed(1)}</span>
                    </div>
                    <Progress value={review.categoryRatings.internet * 20} />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm text-muted-foreground">☕ 카페</span>
                      <span className="text-sm font-medium">{review.categoryRatings.cafe.toFixed(1)}</span>
                    </div>
                    <Progress value={review.categoryRatings.cafe * 20} />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{review.likes}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <MessageCircle className="h-4 w-4" />
                    <span>{review.comments}</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-primary transition-colors">
                    <Share2 className="h-4 w-4" />
                    <span>공유</span>
                  </button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
