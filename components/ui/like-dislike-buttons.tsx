"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ThumbsUp, ThumbsDown } from "lucide-react"
import { Button } from "@/components/ui/button"

type ReactionType = "like" | "dislike" | null

interface LikeDislikeButtonsProps {
  cityId: string
  initialLikes: number
  initialDislikes: number
  isLoggedIn: boolean
}

export function LikeDislikeButtons({
  cityId,
  initialLikes,
  initialDislikes,
  isLoggedIn
}: LikeDislikeButtonsProps) {
  const router = useRouter()
  const [reaction, setReaction] = useState<ReactionType>(null)
  const [likes, setLikes] = useState(initialLikes)
  const [dislikes, setDislikes] = useState(initialDislikes)

  // localStorage에서 사용자의 반응 불러오기
  useEffect(() => {
    const storedReaction = localStorage.getItem(`city-reaction-${cityId}`)
    if (storedReaction === "like" || storedReaction === "dislike") {
      setReaction(storedReaction)
    }
  }, [cityId])

  const handleLike = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (reaction === "like") {
      // 좋아요 해제
      setReaction(null)
      setLikes(prev => prev - 1)
      localStorage.removeItem(`city-reaction-${cityId}`)
    } else if (reaction === "dislike") {
      // 싫어요 → 좋아요
      setReaction("like")
      setLikes(prev => prev + 1)
      setDislikes(prev => prev - 1)
      localStorage.setItem(`city-reaction-${cityId}`, "like")
    } else {
      // 새로 좋아요
      setReaction("like")
      setLikes(prev => prev + 1)
      localStorage.setItem(`city-reaction-${cityId}`, "like")
    }
  }

  const handleDislike = () => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (reaction === "dislike") {
      // 싫어요 해제
      setReaction(null)
      setDislikes(prev => prev - 1)
      localStorage.removeItem(`city-reaction-${cityId}`)
    } else if (reaction === "like") {
      // 좋아요 → 싫어요
      setReaction("dislike")
      setDislikes(prev => prev + 1)
      setLikes(prev => prev - 1)
      localStorage.setItem(`city-reaction-${cityId}`, "dislike")
    } else {
      // 새로 싫어요
      setReaction("dislike")
      setDislikes(prev => prev + 1)
      localStorage.setItem(`city-reaction-${cityId}`, "dislike")
    }
  }

  return (
    <div className="flex items-center gap-2">
      <Button
        variant="outline"
        size="sm"
        className={`gap-2 ${
          reaction === "like"
            ? "text-blue-600 border-blue-600 bg-blue-50 hover:bg-blue-100"
            : ""
        }`}
        onClick={handleLike}
      >
        <ThumbsUp
          className={`h-4 w-4 ${
            reaction === "like" ? "fill-blue-600" : ""
          }`}
        />
        <span>{likes}</span>
      </Button>

      <Button
        variant="outline"
        size="sm"
        className={`gap-2 ${
          reaction === "dislike"
            ? "text-red-600 border-red-600 bg-red-50 hover:bg-red-100"
            : ""
        }`}
        onClick={handleDislike}
      >
        <ThumbsDown
          className={`h-4 w-4 ${
            reaction === "dislike" ? "fill-red-600" : ""
          }`}
        />
        <span>{dislikes}</span>
      </Button>
    </div>
  )
}
