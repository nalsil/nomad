import { Smartphone } from "lucide-react"
import { Button } from "@/components/ui/button"

export function AppDownload() {
  return (
    <section className="py-16 bg-gradient-to-br from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <div className="mb-4">
            <Smartphone className="h-16 w-16 mx-auto mb-4 opacity-90" />
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            📱 한국노마드 앱 다운로드
          </h2>
          <p className="text-lg mb-8 text-blue-100">
            언제 어디서나 한국의 노마드 도시 정보를 확인하고,<br className="hidden md:block" />
            커뮤니티에 참여하세요
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto gap-2 text-lg px-8"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              iOS App Store
            </Button>

            <Button
              size="lg"
              variant="secondary"
              className="w-full sm:w-auto gap-2 text-lg px-8"
            >
              <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-.61-.92V2.734a1 1 0 0 1 .609-.92zm10.89 10.893l2.302 2.302-10.937 6.333 8.635-8.635zm3.199-3.198l2.807 1.626a.996.996 0 0 1 0 1.73l-2.808 1.626L15.206 12l2.492-2.491zM5.864 2.658L16.802 8.99l-2.303 2.303-8.635-8.635z"/>
              </svg>
              Google Play
            </Button>
          </div>

          <p className="mt-6 text-sm text-blue-100">
            곧 출시 예정입니다. 알림을 받고 싶으시다면 회원가입 해주세요!
          </p>
        </div>
      </div>
    </section>
  )
}
