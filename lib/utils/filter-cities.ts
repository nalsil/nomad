import type { City } from "@/lib/constants"
import type { FilterState } from "@/lib/types/filter"

/**
 * 필터 조건에 따라 도시 리스트를 필터링하고 좋아요 수로 정렬합니다.
 * @param cities - 전체 도시 리스트
 * @param filters - 적용할 필터 조건
 * @returns 필터링 및 정렬된 도시 리스트
 */
export function filterAndSortCities(
  cities: City[],
  filters: FilterState
): City[] {
  let filteredCities = [...cities]

  // 예산 필터 적용
  if (filters.budget) {
    filteredCities = filteredCities.filter(city => city.budget === filters.budget)
  }

  // 지역 필터 적용
  if (filters.region && filters.region !== "전체") {
    filteredCities = filteredCities.filter(city => city.region === filters.region)
  }

  // 환경 필터 적용
  if (filters.environment) {
    filteredCities = filteredCities.filter(city => city.environment === filters.environment)
  }

  // 최고 계절 필터 적용
  if (filters.season) {
    filteredCities = filteredCities.filter(city => city.bestSeason === filters.season)
  }

  // 좋아요 수 내림차순 정렬
  return filteredCities.sort((a, b) => b.likes - a.likes)
}
