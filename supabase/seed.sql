-- =====================================================
-- Nomad 초기 샘플 데이터
-- =====================================================

-- 샘플 도시 데이터 삽입
INSERT INTO public.cities (name_ko, name_en, country, description, image_url, cost_index, internet_speed, safety_score, weather_score, latitude, longitude) VALUES
    ('서울', 'Seoul', '대한민국', '한국의 수도이자 세계적인 메트로폴리탄. 빠른 인터넷과 현대적인 인프라가 돋보이는 디지털 노마드의 천국.', 'https://images.unsplash.com/photo-1601016086096-5a605c3e5609?w=800', 65.5, 250.50, 8.5, 7.0, 37.5665, 126.9780),
    ('부산', 'Busan', '대한민국', '한국 제2의 도시. 아름다운 해변과 온화한 기후, 서울보다 저렴한 생활비가 장점.', 'https://images.unsplash.com/photo-1541365774033-c0defbb66f98?w=800', 55.0, 200.00, 8.8, 7.5, 35.1796, 129.0756),
    ('치앙마이', 'Chiang Mai', '태국', '디지털 노마드의 성지. 저렴한 생활비, 카페 문화, 우수한 커뮤니티로 유명.', 'https://images.unsplash.com/photo-1598970434795-0c54fe7c0648?w=800', 25.0, 80.00, 7.5, 8.0, 18.7883, 98.9853),
    ('발리', 'Bali', '인도네시아', '열대 낙원. 서핑, 요가, 영적인 분위기와 저렴한 생활비가 매력적.', 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800', 30.0, 50.00, 7.0, 8.5, -8.3405, 115.0920),
    ('방콕', 'Bangkok', '태국', '활기찬 대도시. 다양한 음식, 문화, 저렴한 생활비가 특징.', 'https://images.unsplash.com/photo-1508009603885-50cf7c579365?w=800', 35.0, 120.00, 7.2, 7.8, 13.7563, 100.5018),
    ('도쿄', 'Tokyo', '일본', '첨단 기술과 전통의 조화. 안전하고 깨끗하지만 높은 생활비.', 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800', 85.0, 300.00, 9.5, 7.0, 35.6762, 139.6503),
    ('리스본', 'Lisbon', '포르투갈', '유럽의 숨겨진 보석. 저렴한 생활비, 좋은 날씨, 친절한 사람들.', 'https://images.unsplash.com/photo-1585208798174-6cedd86e019a?w=800', 45.0, 100.00, 8.0, 8.5, 38.7223, -9.1393),
    ('멕시코시티', 'Mexico City', '멕시코', '라틴 아메리카 최대 도시. 풍부한 문화와 저렴한 생활비.', 'https://images.unsplash.com/photo-1518659586032-6ac6cbbee6a8?w=800', 28.0, 70.00, 6.5, 7.5, 19.4326, -99.1332),
    ('베를린', 'Berlin', '독일', '유럽의 스타트업 허브. 창의적인 분위기와 합리적인 생활비.', 'https://images.unsplash.com/photo-1560969184-10fe8719e047?w=800', 55.0, 150.00, 8.5, 6.5, 52.5200, 13.4050),
    ('바르셀로나', 'Barcelona', '스페인', '지중해 연안의 아름다운 도시. 예술, 건축, 해변의 조화.', 'https://images.unsplash.com/photo-1583422409516-2895a77efded?w=800', 58.0, 110.00, 7.8, 8.8, 41.3851, 2.1734),
    ('호치민', 'Ho Chi Minh City', '베트남', '역동적인 동남아시아 도시. 매우 저렴한 생활비와 맛있는 음식.', 'https://images.unsplash.com/photo-1583417319070-4a69db38a482?w=800', 22.0, 60.00, 7.0, 7.8, 10.8231, 106.6297),
    ('두바이', 'Dubai', 'UAE', '미래적인 중동의 허브. 세금 없음, 고급 라이프스타일, 높은 생활비.', 'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=800', 75.0, 180.00, 9.0, 6.0, 25.2048, 55.2708);

-- 도시 위치 정보 업데이트 (PostGIS POINT)
UPDATE public.cities SET location = ST_SetSRID(ST_MakePoint(longitude, latitude), 4326);

-- 초기 랭킹 계산
SELECT public.calculate_city_rankings();

-- =====================================================
-- 샘플 리뷰 데이터 (사용자 생성 후 사용)
-- =====================================================
-- 주의: 실제 사용자 ID가 필요하므로, 회원가입 후 아래 쿼리를 실행해야 합니다.
--
-- INSERT INTO public.reviews (city_id, user_id, rating, title, content) VALUES
--     ((SELECT id FROM public.cities WHERE name_en = 'Seoul'), 'user-uuid-here', 5, '서울 최고!', '인터넷이 정말 빠르고 카페도 많아요. 디지털 노마드로 일하기 완벽한 도시입니다.'),
--     ((SELECT id FROM public.cities WHERE name_en = 'Chiang Mai'), 'user-uuid-here', 5, '노마드의 성지', '생활비가 저렴하고 노마드 커뮤니티가 활발합니다. 날씨도 좋고 음식도 맛있어요!'),
--     ((SELECT id FROM public.cities WHERE name_en = 'Bali'), 'user-uuid-here', 4, '서핑과 일의 조화', '아름다운 자연과 여유로운 분위기. 인터넷은 조금 느릴 수 있지만 삶의 질은 최고입니다.');
