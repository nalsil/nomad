-- =====================================================
-- Nomad 데이터베이스 스키마 초기 설정
-- =====================================================

-- 1. 확장 기능 활성화
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "postgis"; -- 지리적 쿼리용

-- =====================================================
-- 2. 사용자 프로필 테이블
-- =====================================================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    username TEXT UNIQUE,
    avatar_url TEXT,
    bio TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT username_length CHECK (char_length(username) >= 3 AND char_length(username) <= 30)
);

-- 프로필 RLS 정책
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can insert their own profile"
    ON public.profiles FOR INSERT
    WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- =====================================================
-- 3. 도시 테이블
-- =====================================================
CREATE TABLE public.cities (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name_ko TEXT NOT NULL,
    name_en TEXT NOT NULL,
    country TEXT NOT NULL,
    description TEXT,
    image_url TEXT,

    -- 평가 지표
    cost_index NUMERIC(5,2) DEFAULT 0, -- 물가 지수 (0-100)
    internet_speed NUMERIC(6,2) DEFAULT 0, -- Mbps
    safety_score NUMERIC(3,2) DEFAULT 0, -- 안전도 (0-10)
    weather_score NUMERIC(3,2) DEFAULT 0, -- 날씨 점수 (0-10)

    -- 위치 정보 (PostGIS)
    latitude NUMERIC(10,7),
    longitude NUMERIC(10,7),
    location GEOGRAPHY(POINT, 4326),

    -- 통계
    views_count INTEGER DEFAULT 0,
    reviews_count INTEGER DEFAULT 0,
    avg_rating NUMERIC(2,1) DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT name_ko_not_empty CHECK (char_length(name_ko) > 0),
    CONSTRAINT name_en_not_empty CHECK (char_length(name_en) > 0)
);

-- 도시 인덱스
CREATE INDEX idx_cities_country ON public.cities(country);
CREATE INDEX idx_cities_views ON public.cities(views_count DESC);
CREATE INDEX idx_cities_rating ON public.cities(avg_rating DESC);
CREATE INDEX idx_cities_location ON public.cities USING GIST(location);

-- 도시 RLS 정책
ALTER TABLE public.cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Cities are viewable by everyone"
    ON public.cities FOR SELECT
    USING (true);

CREATE POLICY "Only authenticated users can insert cities"
    ON public.cities FOR INSERT
    WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Only authenticated users can update cities"
    ON public.cities FOR UPDATE
    USING (auth.role() = 'authenticated');

-- =====================================================
-- 4. 리뷰 테이블
-- =====================================================
CREATE TABLE public.reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,

    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title TEXT,
    content TEXT NOT NULL,

    -- 통계
    likes_count INTEGER DEFAULT 0,
    dislikes_count INTEGER DEFAULT 0,
    helpful_count INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT content_not_empty CHECK (char_length(content) >= 10),
    CONSTRAINT unique_user_city_review UNIQUE (user_id, city_id)
);

-- 리뷰 인덱스
CREATE INDEX idx_reviews_city ON public.reviews(city_id);
CREATE INDEX idx_reviews_user ON public.reviews(user_id);
CREATE INDEX idx_reviews_created ON public.reviews(created_at DESC);
CREATE INDEX idx_reviews_rating ON public.reviews(rating DESC);

-- 리뷰 RLS 정책
ALTER TABLE public.reviews ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reviews are viewable by everyone"
    ON public.reviews FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create reviews"
    ON public.reviews FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own reviews"
    ON public.reviews FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reviews"
    ON public.reviews FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- 5. 리뷰 반응 테이블 (좋아요/싫어요)
-- =====================================================
CREATE TABLE public.review_reactions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    review_id UUID NOT NULL REFERENCES public.reviews(id) ON DELETE CASCADE,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    reaction_type TEXT NOT NULL CHECK (reaction_type IN ('like', 'dislike', 'helpful')),

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_user_review_reaction UNIQUE (review_id, user_id, reaction_type)
);

-- 리뷰 반응 인덱스
CREATE INDEX idx_review_reactions_review ON public.review_reactions(review_id);
CREATE INDEX idx_review_reactions_user ON public.review_reactions(user_id);

-- 리뷰 반응 RLS 정책
ALTER TABLE public.review_reactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Reactions are viewable by everyone"
    ON public.review_reactions FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create reactions"
    ON public.review_reactions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own reactions"
    ON public.review_reactions FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- 6. 도시 랭킹 테이블
-- =====================================================
CREATE TABLE public.city_rankings (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    city_id UUID NOT NULL REFERENCES public.cities(id) ON DELETE CASCADE,
    category TEXT NOT NULL CHECK (category IN ('overall', 'cost', 'internet', 'safety', 'weather')),
    rank INTEGER NOT NULL,
    score NUMERIC(6,2) NOT NULL,
    date DATE NOT NULL DEFAULT CURRENT_DATE,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT unique_city_category_date UNIQUE (city_id, category, date)
);

-- 랭킹 인덱스
CREATE INDEX idx_rankings_category_date ON public.city_rankings(category, date DESC);
CREATE INDEX idx_rankings_rank ON public.city_rankings(rank ASC);

-- 랭킹 RLS 정책
ALTER TABLE public.city_rankings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Rankings are viewable by everyone"
    ON public.city_rankings FOR SELECT
    USING (true);

-- =====================================================
-- 7. 커뮤니티 게시글 테이블
-- =====================================================
CREATE TABLE public.posts (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    city_id UUID REFERENCES public.cities(id) ON DELETE SET NULL,

    title TEXT NOT NULL,
    content TEXT NOT NULL,

    -- 통계
    views_count INTEGER DEFAULT 0,
    comments_count INTEGER DEFAULT 0,
    likes_count INTEGER DEFAULT 0,

    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

    CONSTRAINT title_not_empty CHECK (char_length(title) >= 5),
    CONSTRAINT content_not_empty CHECK (char_length(content) >= 10)
);

-- 게시글 인덱스
CREATE INDEX idx_posts_user ON public.posts(user_id);
CREATE INDEX idx_posts_city ON public.posts(city_id);
CREATE INDEX idx_posts_created ON public.posts(created_at DESC);

-- 게시글 RLS 정책
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Posts are viewable by everyone"
    ON public.posts FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create posts"
    ON public.posts FOR INSERT
    WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own posts"
    ON public.posts FOR UPDATE
    USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own posts"
    ON public.posts FOR DELETE
    USING (auth.uid() = user_id);

-- =====================================================
-- 8. 트리거: 회원가입 시 프로필 자동 생성
-- =====================================================
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, username, avatar_url)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data->>'username', 'user_' || substr(NEW.id::text, 1, 8)),
        COALESCE(NEW.raw_user_meta_data->>'avatar_url', NULL)
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- =====================================================
-- 9. 트리거: 리뷰 좋아요 수 자동 업데이트
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_review_reaction_counts()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.reviews
        SET
            likes_count = CASE WHEN NEW.reaction_type = 'like' THEN likes_count + 1 ELSE likes_count END,
            dislikes_count = CASE WHEN NEW.reaction_type = 'dislike' THEN dislikes_count + 1 ELSE dislikes_count END,
            helpful_count = CASE WHEN NEW.reaction_type = 'helpful' THEN helpful_count + 1 ELSE helpful_count END
        WHERE id = NEW.review_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.reviews
        SET
            likes_count = CASE WHEN OLD.reaction_type = 'like' THEN likes_count - 1 ELSE likes_count END,
            dislikes_count = CASE WHEN OLD.reaction_type = 'dislike' THEN dislikes_count - 1 ELSE dislikes_count END,
            helpful_count = CASE WHEN OLD.reaction_type = 'helpful' THEN helpful_count - 1 ELSE helpful_count END
        WHERE id = OLD.review_id;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_reaction_change
    AFTER INSERT OR DELETE ON public.review_reactions
    FOR EACH ROW EXECUTE FUNCTION public.update_review_reaction_counts();

-- =====================================================
-- 10. 트리거: 도시 리뷰 통계 자동 업데이트
-- =====================================================
CREATE OR REPLACE FUNCTION public.update_city_review_stats()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.cities
        SET
            reviews_count = reviews_count + 1,
            avg_rating = (
                SELECT AVG(rating)::NUMERIC(2,1)
                FROM public.reviews
                WHERE city_id = NEW.city_id
            )
        WHERE id = NEW.city_id;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.cities
        SET
            reviews_count = GREATEST(reviews_count - 1, 0),
            avg_rating = COALESCE((
                SELECT AVG(rating)::NUMERIC(2,1)
                FROM public.reviews
                WHERE city_id = OLD.city_id
            ), 0)
        WHERE id = OLD.city_id;
    ELSIF TG_OP = 'UPDATE' AND OLD.rating <> NEW.rating THEN
        UPDATE public.cities
        SET
            avg_rating = (
                SELECT AVG(rating)::NUMERIC(2,1)
                FROM public.reviews
                WHERE city_id = NEW.city_id
            )
        WHERE id = NEW.city_id;
    END IF;

    RETURN COALESCE(NEW, OLD);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_review_stats_change
    AFTER INSERT OR UPDATE OR DELETE ON public.reviews
    FOR EACH ROW EXECUTE FUNCTION public.update_city_review_stats();

-- =====================================================
-- 11. 함수: 도시 랭킹 계산
-- =====================================================
CREATE OR REPLACE FUNCTION public.calculate_city_rankings(target_date DATE DEFAULT CURRENT_DATE)
RETURNS void AS $$
BEGIN
    -- Overall 랭킹 계산
    INSERT INTO public.city_rankings (city_id, category, rank, score, date)
    SELECT
        id,
        'overall',
        ROW_NUMBER() OVER (ORDER BY overall_score DESC),
        overall_score,
        target_date
    FROM (
        SELECT
            id,
            (
                (cost_index * 0.25) +
                (internet_speed / 100 * 0.25) +
                (safety_score * 10 * 0.25) +
                (weather_score * 10 * 0.25)
            ) AS overall_score
        FROM public.cities
    ) scores
    ON CONFLICT (city_id, category, date)
    DO UPDATE SET rank = EXCLUDED.rank, score = EXCLUDED.score;

    -- Cost 랭킹 계산
    INSERT INTO public.city_rankings (city_id, category, rank, score, date)
    SELECT
        id,
        'cost',
        ROW_NUMBER() OVER (ORDER BY cost_index DESC),
        cost_index,
        target_date
    FROM public.cities
    ON CONFLICT (city_id, category, date)
    DO UPDATE SET rank = EXCLUDED.rank, score = EXCLUDED.score;

    -- Internet 랭킹 계산
    INSERT INTO public.city_rankings (city_id, category, rank, score, date)
    SELECT
        id,
        'internet',
        ROW_NUMBER() OVER (ORDER BY internet_speed DESC),
        internet_speed,
        target_date
    FROM public.cities
    ON CONFLICT (city_id, category, date)
    DO UPDATE SET rank = EXCLUDED.rank, score = EXCLUDED.score;

    -- Safety 랭킹 계산
    INSERT INTO public.city_rankings (city_id, category, rank, score, date)
    SELECT
        id,
        'safety',
        ROW_NUMBER() OVER (ORDER BY safety_score DESC),
        safety_score,
        target_date
    FROM public.cities
    ON CONFLICT (city_id, category, date)
    DO UPDATE SET rank = EXCLUDED.rank, score = EXCLUDED.score;

    -- Weather 랭킹 계산
    INSERT INTO public.city_rankings (city_id, category, rank, score, date)
    SELECT
        id,
        'weather',
        ROW_NUMBER() OVER (ORDER BY weather_score DESC),
        weather_score,
        target_date
    FROM public.cities
    ON CONFLICT (city_id, category, date)
    DO UPDATE SET rank = EXCLUDED.rank, score = EXCLUDED.score;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- =====================================================
-- 12. 함수: 도시 조회수 증가
-- =====================================================
CREATE OR REPLACE FUNCTION public.increment_city_views(city_uuid UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.cities
    SET views_count = views_count + 1
    WHERE id = city_uuid;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
