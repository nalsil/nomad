import { DollarSign, Map, Target } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
            🌍 대한민국에서 원격으로 <br className="hidden md:block" />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              일하며 살기 좋은 곳
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-10">
            328명의 디지털 노마드가 직접 평가한 50개 도시 정보
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" className="gap-2 w-full sm:w-auto">
              <DollarSign className="h-5 w-5" />
              예산으로 찾기
            </Button>
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              <Map className="h-5 w-5" />
              지도로 찾기
            </Button>
            <Button size="lg" variant="outline" className="gap-2 w-full sm:w-auto">
              <Target className="h-5 w-5" />
              AI 추천받기
            </Button>
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-10 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
    </section>
  )
}
