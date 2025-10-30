import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { Navigation } from "@/components/layout/navigation"
import { Footer } from "@/components/layout/footer"
import { FilterProvider } from "@/contexts/filter-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "한국노마드 - 대한민국 디지털 노마드 플랫폼",
  description: "328명의 디지털 노마드가 직접 평가한 50개 도시 정보. 원격으로 일하며 살기 좋은 곳을 찾아보세요.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <FilterProvider>
          <Navigation />
          <main>{children}</main>
          <Footer />
        </FilterProvider>
      </body>
    </html>
  )
}
