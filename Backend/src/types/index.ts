export interface User {
    id: string;
    email: string;
    name: string;
    password: string;
    createdAt: Date;
}

export interface TitleSummary {
    id: string;
    name: string;
    posterUrl: string;
    year: number;
    genres: string[];
}

export interface TitleDetails {
    id: string;
    name: string;
    synopsis: string;
    images: {
        poster: string;
        backdrop: string;
    };
    streams: Array<{
        profile: string;
        drm: string;
    }>;
    similar: string[];
    year: number;
    genres: string[];
}

export interface CatalogResponse {
    items: TitleSummary[];
    nextCursor?: string;
}

export interface PlaybackResponse {
    titleId: string;
    hlsUrl: string;
}

export interface RecommendationItem {
    titleId: string;
    score: number;
}

export interface RecommendationsResponse {
    items: RecommendationItem[];
}

export interface AuthResponse {
    user: {
        id: string;
        email: string;
        name: string;
    };
    jwt: string;
    refreshToken?: string;
}

export interface ApiError {
    error: {
        code: string;
        message: string;
    };
}
