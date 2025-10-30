"use client"

import { createContext, useContext, useState, ReactNode } from "react"
import {
  FilterState,
  INITIAL_FILTER_STATE,
  Budget,
  Region,
  Environment,
  Season
} from "@/lib/types/filter"

interface FilterContextType {
  filters: FilterState
  setBudget: (budget: Budget | null) => void
  setRegion: (region: Region | null) => void
  setEnvironment: (environment: Environment | null) => void
  setSeason: (season: Season | null) => void
  resetFilters: () => void
  hasActiveFilters: boolean
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

export function FilterProvider({ children }: { children: ReactNode }) {
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTER_STATE)

  const setBudget = (budget: Budget | null) => {
    setFilters(prev => ({ ...prev, budget }))
  }

  const setRegion = (region: Region | null) => {
    setFilters(prev => ({ ...prev, region }))
  }

  const setEnvironment = (environment: Environment | null) => {
    setFilters(prev => ({ ...prev, environment }))
  }

  const setSeason = (season: Season | null) => {
    setFilters(prev => ({ ...prev, season }))
  }

  const resetFilters = () => {
    setFilters(INITIAL_FILTER_STATE)
  }

  const hasActiveFilters =
    filters.budget !== null ||
    filters.region !== null ||
    filters.environment !== null ||
    filters.season !== null

  return (
    <FilterContext.Provider
      value={{
        filters,
        setBudget,
        setRegion,
        setEnvironment,
        setSeason,
        resetFilters,
        hasActiveFilters
      }}
    >
      {children}
    </FilterContext.Provider>
  )
}

export function useFilters() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error("useFilters must be used within a FilterProvider")
  }
  return context
}
