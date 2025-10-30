import { Users, Building2, FileText } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

interface StatsSectionProps {
  initialStats: {
    cities: number
    reviews: number
    users: number
  }
}

export function StatsSection({ initialStats }: StatsSectionProps) {
  const stats = [
    {
      icon: Users,
      value: initialStats.users,
      label: "등록된 사용자",
      suffix: "명"
    },
    {
      icon: Building2,
      value: initialStats.cities,
      label: "등록된 도시",
      suffix: "개"
    },
    {
      icon: FileText,
      value: initialStats.reviews,
      label: "작성된 리뷰",
      suffix: "개"
    }
  ]

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-10 flex items-center justify-center gap-2">
          📊 통계 & 인사이트
        </h2>

        {/* Main Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-2">
                    {stat.value.toLocaleString()}
                    <span className="text-lg">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
