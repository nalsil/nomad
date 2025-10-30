import { ArrowRight, Users, MessageCircle, Calendar } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MOCK_COMMUNITY } from "@/lib/constants"

export function CommunitySection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold flex items-center gap-2">
            💬 실시간 커뮤니티
          </h2>
          <button
            disabled
            className="text-sm font-medium text-muted-foreground cursor-not-allowed flex items-center gap-1 opacity-60"
          >
            커뮤니티 입장
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Chat Rooms */}
          {MOCK_COMMUNITY.chatRooms.map((room) => (
            <Card key={room.cityId}>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  📍 {room.cityName} 오픈채팅
                </CardTitle>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Users className="h-4 w-4" />
                  <span>{room.onlineCount}명 온라인</span>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 mb-4">
                  {room.recentMessages.map((msg, idx) => (
                    <div key={idx} className="text-sm">
                      <div className="flex items-start gap-2">
                        <MessageCircle className="h-4 w-4 mt-0.5 text-muted-foreground flex-shrink-0" />
                        <div className="flex-1">
                          <span className="font-medium">@{msg.username}:</span>
                          <span className="text-muted-foreground ml-1">{msg.message}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <Button className="w-full" variant="outline">
                  채팅 참여하기
                </Button>
              </CardContent>
            </Card>
          ))}

          {/* Upcoming Meetups */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                🗓️ 다가오는 밋업
              </CardTitle>
            </CardHeader>
            <CardContent>
              {MOCK_COMMUNITY.upcomingMeetups.map((meetup) => (
                <div key={meetup.id} className="mb-4">
                  <div className="flex items-start gap-3 p-4 rounded-lg bg-muted/50">
                    <Calendar className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <div className="flex-1">
                      <div className="text-sm font-medium mb-1">{meetup.date}</div>
                      <div className="font-semibold mb-1">📍 {meetup.city}</div>
                      <div className="text-sm mb-2">{meetup.title}</div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Users className="h-4 w-4" />
                        <span>{meetup.attendees}명 참석 예정</span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              <Button className="w-full" variant="link">
                더 많은 밋업 보기
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
