"use client"

import { HeroSection } from "@/components/home/hero-section"
import { PopularCities } from "@/components/home/popular-cities"
import { RankingSection } from "@/components/home/ranking-section"
import { CommunitySection } from "@/components/home/community-section"
import { ReviewsSection } from "@/components/home/reviews-section"
import { NomadMap } from "@/components/home/nomad-map"
import { AIRecommendation } from "@/components/home/ai-recommendation"
import { StatsSection } from "@/components/home/stats-section"
import { AppDownload } from "@/components/home/app-download"
import { FilterProvider } from "@/contexts/filter-context"

export default function Home() {
  return (
    <FilterProvider>
      <HeroSection />
      <PopularCities />
      <RankingSection />
      <CommunitySection />
      <ReviewsSection />
      <NomadMap />
      <AIRecommendation />
      <StatsSection />
      <AppDownload />
    </FilterProvider>
  )
}
