import { ArrowRight, Users } from "lucide-react"
import { Card } from "@/components/ui/card"
import { MOCK_LOCATIONS, MOCK_STATS } from "@/lib/constants"

export function NomadMap() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            🗺️ 실시간 노마드 맵
          </h2>
          <a
            href="#"
            className="text-sm font-medium text-primary hover:underline flex items-center gap-1"
          >
            전체 지도 보기
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>

        <Card className="p-8">
          <div className="relative aspect-video bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg overflow-hidden">
            {/* Simplified Korea Map Visualization */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="relative w-full h-full max-w-2xl mx-auto">
                <div className="absolute inset-0 flex items-center justify-center text-6xl opacity-10">
                  🗾
                </div>

                {/* City Markers */}
                {MOCK_LOCATIONS.map((location, idx) => {
                  const positions = [
                    { top: "15%", right: "25%" }, // 속초
                    { top: "25%", right: "20%" }, // 강릉
                    { top: "35%", left: "40%" }, // 서울/경기
                    { top: "55%", left: "25%" }, // 전주
                    { bottom: "25%", right: "15%" }, // 부산
                    { bottom: "10%", left: "10%" }, // 제주
                  ]
                  const position = positions[idx] || { top: "50%", left: "50%" }

                  return (
                    <div
                      key={location.cityId}
                      className="absolute group cursor-pointer"
                      style={position}
                    >
                      <div className="relative">
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white font-bold shadow-lg group-hover:scale-110 transition-transform">
                          {location.nomadCount}
                        </div>
                        <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap bg-white px-2 py-1 rounded shadow-md text-xs font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                          {location.cityName} ({location.nomadCount}명)
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>

          <div className="mt-6 space-y-2 text-center">
            <div className="flex items-center justify-center gap-2 text-lg font-medium">
              <Users className="h-5 w-5 text-primary" />
              <span>현재 총 <span className="text-primary font-bold">{MOCK_STATS.activeNomads}명</span>의 노마드가 활동 중입니다</span>
            </div>
            <div className="text-sm text-muted-foreground">
              가장 인기있는 도시: {MOCK_LOCATIONS.slice(0, 3).map((loc, idx) => (
                <span key={loc.cityId}>
                  {loc.cityName} ({loc.nomadCount}명){idx < 2 ? " • " : ""}
                </span>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
}
