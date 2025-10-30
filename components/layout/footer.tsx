import { Facebook, Instagram, Twitter, Mail } from "lucide-react"

export function Footer() {
  const footerSections = [
    {
      title: "서비스",
      links: ["소개", "이용 방법", "요금제", "이용 약관", "개인정보 처리방침"]
    },
    {
      title: "커뮤니티",
      links: ["오픈채팅", "밋업", "블로그", "SNS"]
    },
    {
      title: "파트너",
      links: ["제휴 문의", "광고 문의", "채용"]
    },
    {
      title: "문의",
      links: ["고객센터", "FAQ", "이메일 문의"]
    }
  ]

  return (
    <footer className="border-t bg-muted/50">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-6">
          {/* Logo and Description */}
          <div className="lg:col-span-2">
            <div className="text-xl font-bold mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              🏙️ 한국노마드
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              대한민국 디지털 노마드를 위한<br />
              올인원 플랫폼
            </p>
            <div className="flex gap-3">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Footer Links */}
          {footerSections.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-3">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm text-muted-foreground hover:text-primary transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p className="mb-2">📧 contact@koreannomad.com</p>
          <p>© 2025 한국노마드. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
