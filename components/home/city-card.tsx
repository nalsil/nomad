"use client"

import Image from "next/image"
import { DollarSign, MapPin, Coffee, Snowflake } from "lucide-react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { FilterInfoItem } from "@/components/ui/filter-info-item"
import { LikeDislikeButtons } from "@/components/ui/like-dislike-buttons"
import { useUser } from "@/hooks/use-user"
import type { City } from "@/lib/constants"

interface CityCardProps {
  city: City
}

export function CityCard({ city }: CityCardProps) {
  const { user } = useUser()
  const isLoggedIn = !!user
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={city.imageUrl}
          alt={city.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <CardContent className="p-4">
        {/* 도시 이름 */}
        <h3 className="text-xl font-bold mb-4">
          {city.name}
        </h3>

        {/* 필터 정보 (Key-Value) */}
        <div className="mb-4">
          <FilterInfoItem
            icon={DollarSign}
            label="예산"
            value={city.budget}
          />
          <FilterInfoItem
            icon={MapPin}
            label="지역"
            value={city.region}
          />
          <FilterInfoItem
            icon={Coffee}
            label="환경"
            value={city.environment}
          />
          <FilterInfoItem
            icon={Snowflake}
            label="최고 계절"
            value={city.bestSeason}
          />
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 flex items-center justify-center">
        <LikeDislikeButtons
          cityId={city.id}
          initialLikes={city.likes}
          initialDislikes={city.dislikes}
          isLoggedIn={isLoggedIn}
        />
      </CardFooter>
    </Card>
  )
}
