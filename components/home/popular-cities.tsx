import { PopularCitiesClient } from "./popular-cities-client"
import type { City } from "@/lib/supabase/types"

interface PopularCitiesProps {
  initialCities: City[]
}

export function PopularCities({ initialCities }: PopularCitiesProps) {
  return <PopularCitiesClient cities={initialCities} />
}
