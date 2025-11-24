import { User, TitleSummary, TitleDetails } from '../types';
import { getPosterUrl, getBackdropUrl, isS3Configured } from '../utils/s3';

// In-memory user database (replace with real DB in production)
export const users: User[] = [];

// Mock catalog data
export const catalogTitles: TitleSummary[] = Array.from({ length: 100 }, (_, i) => {
    const titleId = `tt${1000 + i}`;
    return {
        id: titleId,
        name: `Title ${i + 1}`,
        posterUrl: isS3Configured()
            ? getPosterUrl(titleId)
            : `https://picsum.photos/seed/${i}/300/450`,
        year: 2015 + (i % 10),
        genres: getRandomGenres(i),
    };
});

// Mock title details
export const titleDetailsMap = new Map<string, TitleDetails>();

// Initialize title details
catalogTitles.forEach((title) => {
    titleDetailsMap.set(title.id, {
        id: title.id,
        name: title.name,
        synopsis: `An epic tale of adventure, drama, and excitement. ${title.name} follows our heroes as they embark on a journey that will change their lives forever. With stunning visuals and a gripping storyline, this is a must-watch experience.`,
        images: {
            poster: title.posterUrl,
            backdrop: isS3Configured()
                ? getBackdropUrl(title.id)
                : `https://picsum.photos/seed/${title.id}/1920/1080`,
        },
        streams: [
            { profile: '1080p', drm: 'widevine' },
            { profile: '720p', drm: 'widevine' },
            { profile: '480p', drm: 'none' },
        ],
        similar: getRandomTitleIds(4),
        year: title.year,
        genres: title.genres,
    });
});

// Refresh tokens storage (in-memory)
export const refreshTokens = new Set<string>();

// Helper functions
function getRandomGenres(seed: number): string[] {
    const allGenres = ['Action', 'Drama', 'Comedy', 'Thriller', 'Sci-Fi', 'Romance', 'Horror', 'Documentary'];
    const count = (seed % 3) + 1;
    const start = seed % (allGenres.length - count);
    return allGenres.slice(start, start + count);
}

function getRandomTitleIds(count: number): string[] {
    const ids: string[] = [];
    for (let i = 0; i < count; i++) {
        const randomIndex = Math.floor(Math.random() * catalogTitles.length);
        ids.push(catalogTitles[randomIndex].id);
    }
    return ids;
}

// User helper functions
export const findUserByEmail = (email: string): User | undefined => {
    return users.find((u) => u.email === email);
};

export const findUserById = (id: string): User | undefined => {
    return users.find((u) => u.id === id);
};

export const createUser = (email: string, password: string, name: string): User => {
    const user: User = {
        id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        email,
        password,
        name,
        createdAt: new Date(),
    };
    users.push(user);
    return user;
};

export const updateUser = (id: string, updates: Partial<User>): User | undefined => {
    const user = findUserById(id);
    if (!user) return undefined;

    Object.assign(user, updates);
    return user;
};
