"use client"

import Image from "next/image"
import { Star, Wifi, Shield, DollarSign } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { City } from "@/lib/supabase/types"

interface CityCardProps {
  city: City
}

// 물가 지수를 예산 레이블로 변환
function getCostLabel(costIndex: number): string {
  if (costIndex < 30) return "💰 저렴"
  if (costIndex < 60) return "💰💰 보통"
  return "💰💰💰 비싸"
}

// 점수를 색상으로 변환
function getScoreColor(score: number): string {
  if (score >= 8) return "text-green-600"
  if (score >= 6) return "text-yellow-600"
  return "text-red-600"
}

export function CityCard({ city }: CityCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={city.image_url || '/placeholder-city.jpg'}
          alt={city.name_ko}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {city.avg_rating > 0 && (
          <div className="absolute top-2 right-2 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-semibold">{city.avg_rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      <CardContent className="p-4">
        {/* 도시 이름 */}
        <div className="mb-3">
          <h3 className="text-xl font-bold">{city.name_ko}</h3>
          <p className="text-sm text-muted-foreground">{city.country}</p>
        </div>

        {/* 주요 지표 */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <DollarSign className="h-4 w-4" />
              <span>물가</span>
            </div>
            <span className="font-medium">{getCostLabel(city.cost_index)}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Wifi className="h-4 w-4" />
              <span>인터넷</span>
            </div>
            <span className="font-medium">{city.internet_speed.toFixed(0)} Mbps</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-1 text-muted-foreground">
              <Shield className="h-4 w-4" />
              <span>안전도</span>
            </div>
            <span className={`font-medium ${getScoreColor(city.safety_score)}`}>
              {city.safety_score.toFixed(1)}/10
            </span>
          </div>
        </div>

        {/* 통계 */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span>👁️ {city.views_count.toLocaleString()}</span>
          <span>•</span>
          <span>✍️ {city.reviews_count} 리뷰</span>
        </div>
      </CardContent>
    </Card>
  )
}
