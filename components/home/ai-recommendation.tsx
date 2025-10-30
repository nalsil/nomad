"use client"

import { useState } from "react"
import { Target } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export function AIRecommendation() {
  const [step, setStep] = useState(1)
  const [selections, setSelections] = useState({
    budget: "",
    atmosphere: "",
    priorities: [] as string[]
  })

  const budgetOptions = [
    { value: "low", label: "~80만원" },
    { value: "mid-low", label: "80-120만원" },
    { value: "mid", label: "120-150만원" },
    { value: "mid-high", label: "150-200만원" },
    { value: "high", label: "200만원+" }
  ]

  const atmosphereOptions = [
    { value: "beach", label: "🌊 바다", emoji: "🌊" },
    { value: "mountain", label: "⛰️ 산", emoji: "⛰️" },
    { value: "culture", label: "🏛️ 문화", emoji: "🏛️" },
    { value: "city", label: "🏙️ 도심", emoji: "🏙️" },
    { value: "nature", label: "🌳 자연", emoji: "🌳" }
  ]

  const priorityOptions = [
    { value: "internet", label: "빠른 인터넷" },
    { value: "rent", label: "저렴한 월세" },
    { value: "cafe", label: "많은 카페" },
    { value: "transport", label: "좋은 교통" },
    { value: "quiet", label: "조용한 환경" },
    { value: "coworking", label: "코워킹 공간" },
    { value: "culture", label: "문화생활" },
    { value: "food", label: "맛집" },
    { value: "weather", label: "날씨" },
    { value: "community", label: "커뮤니티" }
  ]

  const handlePriorityToggle = (value: string) => {
    if (selections.priorities.includes(value)) {
      setSelections({
        ...selections,
        priorities: selections.priorities.filter(p => p !== value)
      })
    } else if (selections.priorities.length < 3) {
      setSelections({
        ...selections,
        priorities: [...selections.priorities, value]
      })
    }
  }

  return (
    <section className="py-16 bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-3 flex items-center justify-center gap-2">
            🎯 당신에게 딱 맞는 도시 찾기
          </h2>
          <p className="text-center text-muted-foreground mb-10">
            3가지 질문으로 AI가 최적의 도시를 추천해드립니다
          </p>

          <Card>
            <CardContent className="p-8">
              <div className="space-y-8">
                {/* Step 1: Budget */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    💰 월 예산이 얼마인가요?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {budgetOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelections({ ...selections, budget: option.value })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selections.budget === option.value
                            ? "border-primary bg-primary/10 font-semibold"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 2: Atmosphere */}
                <div>
                  <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                    🏙️ 어떤 분위기를 선호하세요?
                  </h3>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {atmosphereOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => setSelections({ ...selections, atmosphere: option.value })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          selections.atmosphere === option.value
                            ? "border-primary bg-primary/10 font-semibold"
                            : "border-gray-200 hover:border-primary/50"
                        }`}
                      >
                        <div className="text-3xl mb-1">{option.emoji}</div>
                        <div className="text-sm">{option.label.split(" ")[1]}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Step 3: Priorities */}
                <div>
                  <h3 className="text-xl font-semibold mb-2 flex items-center gap-2">
                    ⚡ 중요한 요소는? <span className="text-sm text-muted-foreground font-normal">(최대 3개)</span>
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    선택됨: {selections.priorities.length}/3
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                    {priorityOptions.map((option) => (
                      <button
                        key={option.value}
                        onClick={() => handlePriorityToggle(option.value)}
                        disabled={!selections.priorities.includes(option.value) && selections.priorities.length >= 3}
                        className={`p-3 rounded-lg border-2 transition-all text-sm ${
                          selections.priorities.includes(option.value)
                            ? "border-primary bg-primary/10 font-semibold"
                            : "border-gray-200 hover:border-primary/50 disabled:opacity-50 disabled:cursor-not-allowed"
                        }`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Submit Button */}
                <Button
                  size="lg"
                  className="w-full gap-2"
                  disabled={!selections.budget || !selections.atmosphere || selections.priorities.length === 0}
                >
                  <Target className="h-5 w-5" />
                  AI로 도시 추천받기
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
