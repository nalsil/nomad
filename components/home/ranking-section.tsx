import { ArrowRight, TrendingUp, TrendingDown } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { MOCK_RANKINGS } from "@/lib/constants"

export function RankingSection() {
  const rankingTypes = [
    { key: "overall", title: "종합 랭킹", emoji: "⭐" },
    { key: "value", title: "가성비 랭킹", emoji: "💰" },
    { key: "workspace", title: "업무 환경", emoji: "📡" },
    { key: "trending", title: "급상승", emoji: "📈" }
  ]

  const getRankingData = (key: string) => {
    return MOCK_RANKINGS[key as keyof typeof MOCK_RANKINGS]
  }

  const getChangeIcon = (change: number) => {
    if (change > 0) return <span className="text-green-500 flex items-center">▲{change}</span>
    if (change < 0) return <span className="text-red-500 flex items-center">▼{Math.abs(change)}</span>
    return <span className="text-muted-foreground">-</span>
  }

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            🏆 이번 주 TOP 랭킹
          </h2>
          <button
            disabled
            className="text-sm font-medium text-muted-foreground cursor-not-allowed flex items-center gap-1 opacity-60"
          >
            전체 랭킹 보기
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {rankingTypes.map((type) => {
            const rankings = getRankingData(type.key)
            return (
              <Card key={type.key}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <span>{type.emoji}</span>
                    {type.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {rankings.map((ranking) => (
                      <div
                        key={ranking.rank}
                        className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-lg w-6">
                            {ranking.rank === 1 ? "🥇" : ranking.rank === 2 ? "🥈" : ranking.rank === 3 ? "🥉" : `${ranking.rank}️⃣`}
                          </span>
                          <div>
                            <div className="font-medium">{ranking.cityName}</div>
                            {type.key !== "trending" && (
                              <div className="text-xs text-muted-foreground">
                                {type.key === "overall" && `⭐ ${ranking.score}`}
                                {type.key === "value" && `💰 ${ranking.score}`}
                                {type.key === "workspace" && `📡 ${ranking.score}`}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="text-sm font-medium">
                          {getChangeIcon(ranking.change)}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
