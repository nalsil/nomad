import { Users, Building2, FileText, Calendar, TrendingUp } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { MOCK_STATS } from "@/lib/constants"

export function StatsSection() {
  const stats = [
    {
      icon: Users,
      value: MOCK_STATS.activeNomads,
      label: "활동 중인 노마드",
      suffix: "명"
    },
    {
      icon: Building2,
      value: MOCK_STATS.totalCities,
      label: "등록된 도시",
      suffix: "개"
    },
    {
      icon: FileText,
      value: MOCK_STATS.totalReviews.toLocaleString(),
      label: "작성된 리뷰",
      suffix: "개"
    },
    {
      icon: Calendar,
      value: MOCK_STATS.totalMeetups,
      label: "개최된 밋업",
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
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <Card key={stat.label}>
                <CardContent className="p-6 text-center">
                  <Icon className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <div className="text-3xl font-bold mb-2">
                    {stat.value}
                    <span className="text-lg">{stat.suffix}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            )
          })}
        </div>

        {/* Trends */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
              📈 이번 달 트렌드
            </h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  🔥 가장 많이 검색된 도시
                </h4>
                <ol className="space-y-2">
                  {MOCK_STATS.trends.topSearched.map((city, idx) => (
                    <li key={city} className="flex items-center gap-3">
                      <span className="font-bold text-primary">{idx + 1}.</span>
                      <span>{city}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h4 className="font-medium mb-3 flex items-center gap-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  평가가 가장 많이 올라간 도시
                </h4>
                <ul className="space-y-2">
                  {MOCK_STATS.trends.risingStars.map((item) => (
                    <li key={item.city} className="flex items-center justify-between">
                      <span>{item.city}</span>
                      <span className="text-green-500 font-medium">+{item.change}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-medium mb-3">🆕 새로 등록된 노마드</h4>
                <p className="text-2xl font-bold text-primary">
                  이번 주 +{MOCK_STATS.trends.newNomads}명
                </p>
              </div>

              <div>
                <h4 className="font-medium mb-3">💬 가장 활발한 커뮤니티</h4>
                <p className="text-lg">{MOCK_STATS.trends.mostActiveCommunity}</p>
                <p className="text-sm text-muted-foreground">일 평균 156개 메시지</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
