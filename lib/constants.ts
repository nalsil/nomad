import type { Budget, Region, Environment, Season } from "./types/filter"

export interface City {
  id: string
  name: string
  region: Region
  imageUrl: string
  rating: number
  reviewCount: number
  monthlyCost: number
  rentCost: number
  internetSpeed: number
  cafeCount: number
  coworkingCount: number
  tags: string[]
  currentNomads: number
  isFavorited: boolean
  likes: number
  dislikes: number
  budget: Budget
  environment: Environment
  bestSeason: Season
  categoryRatings: {
    value: number
    internet: number
    cafe: number
    housing: number
    transport: number
    culture: number
    community: number
    nature: number
  }
}

export interface Review {
  id: string
  author: {
    username: string
    job: string
    avatarUrl: string
  }
  cityId: string
  cityName: string
  rating: number
  duration: string
  summary: string
  categoryRatings: {
    value: number
    internet: number
    cafe: number
  }
  likes: number
  comments: number
  createdAt: string
}

export interface Ranking {
  rank: number
  cityId: string
  cityName: string
  score: number
  change: number
}

export const MOCK_CITIES: City[] = [
  {
    id: "jeju-city",
    name: "제주시",
    region: "제주도",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    rating: 4.5,
    reviewCount: 328,
    monthlyCost: 1200000,
    rentCost: 550000,
    internetSpeed: 500,
    cafeCount: 42,
    coworkingCount: 8,
    tags: ["바다뷰", "조용함", "카페많음"],
    currentNomads: 23,
    isFavorited: false,
    likes: 42,
    dislikes: 8,
    budget: "100~200만원",
    environment: "자연친화",
    bestSeason: "봄",
    categoryRatings: {
      value: 4.0,
      internet: 5.0,
      cafe: 4.5,
      housing: 3.5,
      transport: 3.0,
      culture: 4.0,
      community: 4.5,
      nature: 5.0
    }
  },
  {
    id: "busan-haeundae",
    name: "해운대",
    region: "경상도",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    rating: 4.3,
    reviewCount: 156,
    monthlyCost: 1000000,
    rentCost: 450000,
    internetSpeed: 400,
    cafeCount: 28,
    coworkingCount: 5,
    tags: ["해변", "활기참", "맛집"],
    currentNomads: 18,
    isFavorited: false,
    likes: 35,
    dislikes: 12,
    budget: "100~200만원",
    environment: "카페작업",
    bestSeason: "여름",
    categoryRatings: {
      value: 4.2,
      internet: 4.5,
      cafe: 4.0,
      housing: 3.8,
      transport: 4.5,
      culture: 4.3,
      community: 4.0,
      nature: 4.5
    }
  },
  {
    id: "gangneung",
    name: "강릉",
    region: "강원도",
    imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80",
    rating: 4.7,
    reviewCount: 89,
    monthlyCost: 800000,
    rentCost: 400000,
    internetSpeed: 300,
    cafeCount: 15,
    coworkingCount: 3,
    tags: ["자연", "저렴", "카페"],
    currentNomads: 12,
    isFavorited: false,
    likes: 48,
    dislikes: 5,
    budget: "100만원 이하",
    environment: "자연친화",
    bestSeason: "가을",
    categoryRatings: {
      value: 4.5,
      internet: 4.0,
      cafe: 3.5,
      housing: 4.0,
      transport: 3.0,
      culture: 3.5,
      community: 3.8,
      nature: 5.0
    }
  },
  {
    id: "jeonju",
    name: "전주",
    region: "전라도",
    imageUrl: "https://images.unsplash.com/photo-1555991618-36fcbaaf7d8f?w=800&q=80",
    rating: 4.2,
    reviewCount: 67,
    monthlyCost: 700000,
    rentCost: 350000,
    internetSpeed: 350,
    cafeCount: 12,
    coworkingCount: 2,
    tags: ["한옥", "문화", "맛집"],
    currentNomads: 8,
    isFavorited: false,
    likes: 28,
    dislikes: 9,
    budget: "100만원 이하",
    environment: "도심선호",
    bestSeason: "겨울",
    categoryRatings: {
      value: 4.8,
      internet: 4.2,
      cafe: 3.0,
      housing: 4.0,
      transport: 3.5,
      culture: 5.0,
      community: 3.5,
      nature: 3.8
    }
  },
  {
    id: "seoul-gangnam",
    name: "강남",
    region: "수도권",
    imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
    rating: 4.8,
    reviewCount: 542,
    monthlyCost: 2500000,
    rentCost: 1200000,
    internetSpeed: 1000,
    cafeCount: 120,
    coworkingCount: 45,
    tags: ["코워킹", "네트워킹", "편리함"],
    currentNomads: 89,
    isFavorited: false,
    likes: 75,
    dislikes: 18,
    budget: "200만원 이상",
    environment: "코워킹 필수",
    bestSeason: "봄",
    categoryRatings: {
      value: 3.0,
      internet: 5.0,
      cafe: 5.0,
      housing: 2.5,
      transport: 5.0,
      culture: 4.8,
      community: 5.0,
      nature: 2.0
    }
  },
  {
    id: "incheon-songdo",
    name: "송도",
    region: "수도권",
    imageUrl: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
    rating: 4.1,
    reviewCount: 134,
    monthlyCost: 1500000,
    rentCost: 700000,
    internetSpeed: 800,
    cafeCount: 35,
    coworkingCount: 12,
    tags: ["신도시", "깔끔함", "교통"],
    currentNomads: 24,
    isFavorited: false,
    likes: 32,
    dislikes: 11,
    budget: "100~200만원",
    environment: "도심선호",
    bestSeason: "여름",
    categoryRatings: {
      value: 3.8,
      internet: 5.0,
      cafe: 3.5,
      housing: 4.0,
      transport: 4.5,
      culture: 3.0,
      community: 3.5,
      nature: 3.5
    }
  },
  {
    id: "daejeon",
    name: "대전",
    region: "충청도",
    imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80",
    rating: 4.3,
    reviewCount: 98,
    monthlyCost: 900000,
    rentCost: 450000,
    internetSpeed: 600,
    cafeCount: 28,
    coworkingCount: 8,
    tags: ["과학도시", "조용함", "저렴"],
    currentNomads: 16,
    isFavorited: false,
    likes: 38,
    dislikes: 7,
    budget: "100만원 이하",
    environment: "카페작업",
    bestSeason: "가을",
    categoryRatings: {
      value: 4.5,
      internet: 4.8,
      cafe: 3.8,
      housing: 4.2,
      transport: 4.0,
      culture: 3.5,
      community: 3.8,
      nature: 3.5
    }
  },
  {
    id: "daegu",
    name: "대구",
    region: "경상도",
    imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80",
    rating: 4.2,
    reviewCount: 176,
    monthlyCost: 1100000,
    rentCost: 500000,
    internetSpeed: 700,
    cafeCount: 45,
    coworkingCount: 15,
    tags: ["도심", "맛집", "문화"],
    currentNomads: 31,
    isFavorited: false,
    likes: 44,
    dislikes: 14,
    budget: "100~200만원",
    environment: "도심선호",
    bestSeason: "여름",
    categoryRatings: {
      value: 4.0,
      internet: 4.5,
      cafe: 4.2,
      housing: 3.8,
      transport: 4.3,
      culture: 4.5,
      community: 4.0,
      nature: 3.0
    }
  },
  {
    id: "gwangju",
    name: "광주",
    region: "전라도",
    imageUrl: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&q=80",
    rating: 4.4,
    reviewCount: 142,
    monthlyCost: 850000,
    rentCost: 420000,
    internetSpeed: 650,
    cafeCount: 32,
    coworkingCount: 9,
    tags: ["예술", "문화", "저렴"],
    currentNomads: 19,
    isFavorited: false,
    likes: 52,
    dislikes: 8,
    budget: "100만원 이하",
    environment: "카페작업",
    bestSeason: "봄",
    categoryRatings: {
      value: 4.6,
      internet: 4.3,
      cafe: 4.0,
      housing: 4.3,
      transport: 4.0,
      culture: 5.0,
      community: 4.2,
      nature: 3.5
    }
  },
  {
    id: "sokcho",
    name: "속초",
    region: "강원도",
    imageUrl: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&q=80",
    rating: 4.6,
    reviewCount: 87,
    monthlyCost: 1000000,
    rentCost: 480000,
    internetSpeed: 400,
    cafeCount: 18,
    coworkingCount: 4,
    tags: ["바다", "자연", "힐링"],
    currentNomads: 14,
    isFavorited: false,
    likes: 61,
    dislikes: 6,
    budget: "100~200만원",
    environment: "자연친화",
    bestSeason: "여름",
    categoryRatings: {
      value: 4.3,
      internet: 3.8,
      cafe: 3.5,
      housing: 4.0,
      transport: 3.0,
      culture: 3.2,
      community: 3.8,
      nature: 5.0
    }
  },
  {
    id: "yeosu",
    name: "여수",
    region: "전라도",
    imageUrl: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80",
    rating: 4.5,
    reviewCount: 112,
    monthlyCost: 950000,
    rentCost: 460000,
    internetSpeed: 450,
    cafeCount: 24,
    coworkingCount: 5,
    tags: ["항구", "야경", "해산물"],
    currentNomads: 17,
    isFavorited: false,
    likes: 56,
    dislikes: 9,
    budget: "100~200만원",
    environment: "자연친화",
    bestSeason: "봄",
    categoryRatings: {
      value: 4.4,
      internet: 4.0,
      cafe: 3.8,
      housing: 4.1,
      transport: 3.5,
      culture: 4.2,
      community: 4.0,
      nature: 4.8
    }
  },
  {
    id: "gyeongju",
    name: "경주",
    region: "경상도",
    imageUrl: "https://images.unsplash.com/photo-1555991618-36fcbaaf7d8f?w=800&q=80",
    rating: 4.3,
    reviewCount: 76,
    monthlyCost: 780000,
    rentCost: 380000,
    internetSpeed: 500,
    cafeCount: 16,
    coworkingCount: 3,
    tags: ["역사", "문화재", "조용함"],
    currentNomads: 11,
    isFavorited: false,
    likes: 41,
    dislikes: 5,
    budget: "100만원 이하",
    environment: "자연친화",
    bestSeason: "가을",
    categoryRatings: {
      value: 4.7,
      internet: 4.2,
      cafe: 3.2,
      housing: 4.5,
      transport: 3.2,
      culture: 5.0,
      community: 3.5,
      nature: 4.5
    }
  },
  {
    id: "chuncheon",
    name: "춘천",
    region: "강원도",
    imageUrl: "https://images.unsplash.com/photo-1583037189850-1921ae7c6c22?w=800&q=80",
    rating: 4.4,
    reviewCount: 94,
    monthlyCost: 850000,
    rentCost: 420000,
    internetSpeed: 550,
    cafeCount: 22,
    coworkingCount: 6,
    tags: ["호수", "닭갈비", "자연"],
    currentNomads: 15,
    isFavorited: false,
    likes: 47,
    dislikes: 7,
    budget: "100만원 이하",
    environment: "자연친화",
    bestSeason: "겨울",
    categoryRatings: {
      value: 4.6,
      internet: 4.5,
      cafe: 3.8,
      housing: 4.3,
      transport: 3.5,
      culture: 3.8,
      community: 4.0,
      nature: 4.8
    }
  },
  {
    id: "bucheon",
    name: "부천",
    region: "수도권",
    imageUrl: "https://images.unsplash.com/photo-1517154421773-0529f29ea451?w=800&q=80",
    rating: 4.0,
    reviewCount: 128,
    monthlyCost: 1800000,
    rentCost: 850000,
    internetSpeed: 900,
    cafeCount: 56,
    coworkingCount: 18,
    tags: ["접근성", "편의시설", "교통"],
    currentNomads: 27,
    isFavorited: false,
    likes: 36,
    dislikes: 13,
    budget: "200만원 이상",
    environment: "코워킹 필수",
    bestSeason: "겨울",
    categoryRatings: {
      value: 3.5,
      internet: 4.8,
      cafe: 4.0,
      housing: 3.2,
      transport: 4.8,
      culture: 3.8,
      community: 4.2,
      nature: 2.5
    }
  },
  {
    id: "cheongju",
    name: "청주",
    region: "충청도",
    imageUrl: "https://images.unsplash.com/photo-1519817650390-64a93db51149?w=800&q=80",
    rating: 4.1,
    reviewCount: 82,
    monthlyCost: 1600000,
    rentCost: 750000,
    internetSpeed: 750,
    cafeCount: 38,
    coworkingCount: 11,
    tags: ["중부권", "교육도시", "편리"],
    currentNomads: 20,
    isFavorited: false,
    likes: 29,
    dislikes: 10,
    budget: "200만원 이상",
    environment: "코워킹 필수",
    bestSeason: "가을",
    categoryRatings: {
      value: 3.8,
      internet: 4.6,
      cafe: 3.9,
      housing: 3.6,
      transport: 4.2,
      culture: 3.7,
      community: 3.9,
      nature: 3.3
    }
  }
]

export const MOCK_REVIEWS: Review[] = [
  {
    id: "review-001",
    author: {
      username: "minho_dev",
      job: "프론트엔드 개발자",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=minho"
    },
    cityId: "jeju-city",
    cityName: "제주 제주시",
    rating: 5.0,
    duration: "3개월",
    summary: "카페에서 바다 보면서 일하기 최고! 렌터카는 필수",
    categoryRatings: {
      value: 4.0,
      internet: 5.0,
      cafe: 4.5
    },
    likes: 24,
    comments: 5,
    createdAt: "2시간 전"
  },
  {
    id: "review-002",
    author: {
      username: "jieun_designer",
      job: "UX 디자이너",
      avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=jieun"
    },
    cityId: "gangneung",
    cityName: "강릉",
    rating: 5.0,
    duration: "2개월",
    summary: "조용하고 집중하기 좋아요. 바다 뷰는 보너스!",
    categoryRatings: {
      value: 5.0,
      internet: 4.0,
      cafe: 3.5
    },
    likes: 18,
    comments: 3,
    createdAt: "1일 전"
  }
]

export const MOCK_RANKINGS = {
  overall: [
    { rank: 1, cityId: "gangneung", cityName: "강릉", score: 4.7, change: 1 },
    { rank: 2, cityId: "jeju-city", cityName: "제주", score: 4.5, change: 0 },
    { rank: 3, cityId: "busan-haeundae", cityName: "부산", score: 4.3, change: -1 },
    { rank: 4, cityId: "jeonju", cityName: "전주", score: 4.2, change: 2 },
    { rank: 5, cityId: "seoul-gangnam", cityName: "강남", score: 4.0, change: 0 }
  ],
  value: [
    { rank: 1, cityId: "jeonju", cityName: "전주", score: 4.8, change: 0 },
    { rank: 2, cityId: "gwangju", cityName: "광주", score: 4.6, change: 1 },
    { rank: 3, cityId: "gangneung", cityName: "강릉", score: 4.5, change: -1 },
    { rank: 4, cityId: "chuncheon", cityName: "춘천", score: 4.3, change: 0 },
    { rank: 5, cityId: "yeosu", cityName: "여수", score: 4.2, change: 0 }
  ],
  workspace: [
    { rank: 1, cityId: "pangyo", cityName: "판교", score: 5.0, change: 0 },
    { rank: 2, cityId: "seoul-gangnam", cityName: "강남", score: 5.0, change: 0 },
    { rank: 3, cityId: "jeju-city", cityName: "제주", score: 4.9, change: 1 },
    { rank: 4, cityId: "busan-haeundae", cityName: "부산", score: 4.5, change: -1 },
    { rank: 5, cityId: "jeonju", cityName: "전주", score: 4.2, change: 0 }
  ],
  trending: [
    { rank: 1, cityId: "sokcho", cityName: "속초", score: 0, change: 0 },
    { rank: 2, cityId: "yangyang", cityName: "양양", score: 0, change: 0 },
    { rank: 3, cityId: "tongyeong", cityName: "통영", score: 0, change: 0 },
    { rank: 4, cityId: "gyeongju", cityName: "경주", score: 0, change: 0 },
    { rank: 5, cityId: "pohang", cityName: "포항", score: 0, change: 0 }
  ]
}

export const MOCK_COMMUNITY = {
  chatRooms: [
    {
      cityId: "jeju-city",
      cityName: "제주",
      onlineCount: 23,
      recentMessages: [
        { username: "minho", message: "오늘 날씨 좋은데 같이 코워킹 할래요?", timestamp: "10:30" },
        { username: "jieun", message: "좋아요! 어디서?", timestamp: "10:32" }
      ]
    },
    {
      cityId: "busan-haeundae",
      cityName: "부산",
      onlineCount: 18,
      recentMessages: [
        { username: "sara", message: "해운대 카페 추천 해주실 분?", timestamp: "09:15" },
        { username: "james", message: "더웨이브 좋아요!", timestamp: "09:20" }
      ]
    }
  ],
  upcomingMeetups: [
    {
      id: "meetup-001",
      date: "11/2 (토) 19:00",
      city: "제주",
      title: "노마드 네트워킹 저녁",
      attendees: 12
    }
  ]
}

export const MOCK_STATS = {
  activeNomads: 328,
  totalCities: 50,
  totalReviews: 1234,
  totalMeetups: 156,
  trends: {
    topSearched: ["제주", "부산", "강릉"],
    risingStars: [
      { city: "속초", change: 0.3 },
      { city: "양양", change: 0.2 },
      { city: "통영", change: 0.2 }
    ],
    newNomads: 42,
    mostActiveCommunity: "제주 오픈채팅"
  }
}

export const MOCK_LOCATIONS = [
  { cityId: "sokcho", cityName: "속초", nomadCount: 8, lat: 38.2070, lng: 128.5918 },
  { cityId: "gangneung", cityName: "강릉", nomadCount: 12, lat: 37.7519, lng: 128.8761 },
  { cityId: "seoul", cityName: "서울/경기", nomadCount: 156, lat: 37.5665, lng: 126.9780 },
  { cityId: "jeonju", cityName: "전주", nomadCount: 67, lat: 35.8242, lng: 127.1480 },
  { cityId: "busan", cityName: "부산", nomadCount: 18, lat: 35.1796, lng: 129.0756 },
  { cityId: "jeju", cityName: "제주", nomadCount: 23, lat: 33.4890, lng: 126.4983 }
]
