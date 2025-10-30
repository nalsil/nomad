import { HeroSection } from "@/components/home/hero-section"
import { PopularCities } from "@/components/home/popular-cities"
import { RankingSection } from "@/components/home/ranking-section"
import { CommunitySection } from "@/components/home/community-section"
import { ReviewsSection } from "@/components/home/reviews-section"
import { NomadMap } from "@/components/home/nomad-map"
import { AIRecommendation } from "@/components/home/ai-recommendation"
import { StatsSection } from "@/components/home/stats-section"
import { AppDownload } from "@/components/home/app-download"
import { getPopularCities, getLatestReviews, getGlobalStats } from "@/lib/supabase/queries"

export const revalidate = 3600 // 1시간마다 재검증

export default async function Home() {
  // 서버에서 초기 데이터 fetch
  const [popularCities, latestReviews, stats] = await Promise.all([
    getPopularCities(12),
    getLatestReviews(6),
    getGlobalStats(),
  ])

  return (
    <>
      <HeroSection />
      <PopularCities initialCities={popularCities} />
      <RankingSection />
      <CommunitySection />
      <ReviewsSection initialReviews={latestReviews} />
      <NomadMap />
      <AIRecommendation />
      <StatsSection initialStats={stats} />
      <AppDownload />
    </>
  )
}
