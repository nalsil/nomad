"use client"

import Link from "next/link"
import { Search, DollarSign, MapPin, Coffee, Snowflake, Bell, MessageCircle, User, LogIn, LogOut, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import { FilterDropdown } from "@/components/ui/filter-dropdown"
import { useUser } from "@/hooks/use-user"
import { useFilters } from "@/contexts/filter-context"
import {
  Budget,
  Region,
  Environment,
  Season,
  BUDGET_OPTIONS,
  REGION_OPTIONS,
  ENVIRONMENT_OPTIONS,
  SEASON_OPTIONS
} from "@/lib/types/filter"

export function Navigation() {
  const { user, isLoading } = useUser()
  const isLoggedIn = !!user

  // FilterContext에서 필터 상태 가져오기
  const {
    filters,
    setBudget,
    setRegion,
    setEnvironment,
    setSeason,
    resetFilters,
    hasActiveFilters
  } = useFilters()

  // 필터 변경 핸들러
  const handleBudgetChange = (budget: Budget) => {
    setBudget(budget)
  }

  const handleRegionChange = (region: Region) => {
    setRegion(region)
  }

  const handleEnvironmentChange = (environment: Environment) => {
    setEnvironment(environment)
  }

  const handleSeasonChange = (season: Season) => {
    setSeason(season)
  }

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:opacity-80 transition-opacity">
            🏙️ 한국노마드
          </div>
        </Link>

        {/* Search Bar - Desktop */}
        <div className="hidden md:flex flex-1 max-w-md mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <input
              type="text"
              placeholder="도시 검색..."
              disabled
              className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring opacity-60 cursor-not-allowed"
            />
          </div>
        </div>

        {/* Filter Buttons - Desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <FilterDropdown
            icon={DollarSign}
            label="예산"
            options={BUDGET_OPTIONS}
            value={filters.budget}
            onChange={handleBudgetChange}
          />
          <FilterDropdown
            icon={MapPin}
            label="지역"
            options={REGION_OPTIONS}
            value={filters.region}
            onChange={handleRegionChange}
          />
          <FilterDropdown
            icon={Coffee}
            label="환경"
            options={ENVIRONMENT_OPTIONS}
            value={filters.environment}
            onChange={handleEnvironmentChange}
          />
          <FilterDropdown
            icon={Snowflake}
            label="계절"
            options={SEASON_OPTIONS}
            value={filters.season}
            onChange={handleSeasonChange}
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="gap-2"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4" />
              초기화
            </Button>
          )}
        </div>

        {/* User Actions */}
        <div className="flex items-center gap-2 ml-4">
          {isLoggedIn ? (
            <>
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <MessageCircle className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon" className="relative hidden sm:flex">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full"></span>
              </Button>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
              <form action="/logout" method="POST">
                <Button variant="ghost" className="gap-2" type="submit">
                  <LogOut className="h-4 w-4" />
                  <span className="hidden sm:inline">로그아웃</span>
                </Button>
              </form>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" className="gap-2">
                  <LogIn className="h-4 w-4" />
                  <span className="hidden sm:inline">로그인</span>
                </Button>
              </Link>
              <Link href="/register">
                <Button className="gap-2">
                  <span>회원가입</span>
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Mobile Search */}
      <div className="md:hidden border-t px-4 py-3">
        <div className="relative w-full">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="도시 검색..."
            disabled
            className="w-full rounded-lg border border-input bg-background pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring opacity-60 cursor-not-allowed"
          />
        </div>
        <div className="flex flex-wrap gap-2 mt-3">
          <FilterDropdown
            icon={DollarSign}
            label="예산"
            options={BUDGET_OPTIONS}
            value={filters.budget}
            onChange={handleBudgetChange}
            className="flex-1 min-w-[80px]"
          />
          <FilterDropdown
            icon={MapPin}
            label="지역"
            options={REGION_OPTIONS}
            value={filters.region}
            onChange={handleRegionChange}
            className="flex-1 min-w-[80px]"
          />
          <FilterDropdown
            icon={Coffee}
            label="환경"
            options={ENVIRONMENT_OPTIONS}
            value={filters.environment}
            onChange={handleEnvironmentChange}
            className="flex-1 min-w-[80px]"
          />
          <FilterDropdown
            icon={Snowflake}
            label="계절"
            options={SEASON_OPTIONS}
            value={filters.season}
            onChange={handleSeasonChange}
            className="flex-1 min-w-[80px]"
          />
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              className="w-full gap-2 mt-2"
              onClick={resetFilters}
            >
              <RotateCcw className="h-4 w-4" />
              필터 초기화
            </Button>
          )}
        </div>
      </div>
    </nav>
  )
}
