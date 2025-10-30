// 필터 옵션 타입 정의
export type Budget = "100만원 이하" | "100~200만원" | "200만원 이상"
export type Region = "전체" | "수도권" | "경상도" | "전라도" | "강원도" | "제주도" | "충청도"
export type Environment = "자연친화" | "도심선호" | "카페작업" | "코워킹 필수"
export type Season = "봄" | "여름" | "가을" | "겨울"

// 필터 상태 인터페이스
export interface FilterState {
  budget: Budget | null
  region: Region | null
  environment: Environment | null
  season: Season | null
}

// 필터 옵션 배열
export const BUDGET_OPTIONS: Budget[] = [
  "100만원 이하",
  "100~200만원",
  "200만원 이상"
]

export const REGION_OPTIONS: Region[] = [
  "전체",
  "수도권",
  "경상도",
  "전라도",
  "강원도",
  "제주도",
  "충청도"
]

export const ENVIRONMENT_OPTIONS: Environment[] = [
  "자연친화",
  "도심선호",
  "카페작업",
  "코워킹 필수"
]

export const SEASON_OPTIONS: Season[] = [
  "봄",
  "여름",
  "가을",
  "겨울"
]

// 초기 필터 상태
export const INITIAL_FILTER_STATE: FilterState = {
  budget: null,
  region: null,
  environment: null,
  season: null
}
