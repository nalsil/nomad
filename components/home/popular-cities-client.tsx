"use client"

import { useMemo } from "react"
import { X } from "lucide-react"
import { CityCard } from "./city-card"
import { useFilters } from "@/contexts/filter-context"
import { Button } from "@/components/ui/button"
import type { City } from "@/lib/supabase/types"

interface PopularCitiesClientProps {
  cities: City[]
}

export function PopularCitiesClient({ cities }: PopularCitiesClientProps) {
  const { filters, resetFilters, hasActiveFilters } = useFilters()

  // 필터링된 도시 리스트
  const displayedCities = useMemo(() => {
    let filtered = [...cities]

    // 지역 필터
    if (filters.region && filters.region !== "전체") {
      // TODO: 지역 매핑 로직 추가 필요
      filtered = filtered.filter(city => city.country.includes(filters.region))
    }

    // 예산 필터
    if (filters.budget) {
      const budgetMap = {
        "100만원 이하": 30,
        "100~200만원": 60,
        "200만원 이상": 100
      }
      const maxBudget = budgetMap[filters.budget as keyof typeof budgetMap] || 100
      filtered = filtered.filter(city => city.cost_index <= maxBudget)
    }

    return filtered
  }, [cities, filters])

  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        {/* 제목 */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            📍 인기 도시
          </h2>
        </div>

        {/* 필터 적용 상태 표시 */}
        {hasActiveFilters && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-sm text-muted-foreground">현재 필터:</span>
            {filters.budget && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                예산: {filters.budget}
              </div>
            )}
            {filters.region && filters.region !== "전체" && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-50 text-green-700 rounded-full text-sm">
                지역: {filters.region}
              </div>
            )}
            {filters.environment && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-sm">
                환경: {filters.environment}
              </div>
            )}
            {filters.season && (
              <div className="inline-flex items-center gap-1 px-3 py-1 bg-orange-50 text-orange-700 rounded-full text-sm">
                계절: {filters.season}
              </div>
            )}
            <Button
              variant="ghost"
              size="sm"
              className="h-7 gap-1 text-xs"
              onClick={resetFilters}
            >
              <X className="h-3 w-3" />
              전체 해제
            </Button>
          </div>
        )}

        {/* 도시 리스트 또는 빈 상태 메시지 */}
        {displayedCities.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayedCities.map((city) => (
              <CityCard key={city.id} city={city} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-2">
              조건에 맞는 도시가 없습니다
            </p>
            <p className="text-sm text-muted-foreground mb-4">
              필터 조건을 변경해보세요
            </p>
            <Button variant="outline" onClick={resetFilters}>
              필터 초기화
            </Button>
          </div>
        )}
      </div>
    </section>
  )
}
