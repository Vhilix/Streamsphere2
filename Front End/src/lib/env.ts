export const ENV = {
  apiBaseUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_API_BASE_URL) || 'https://api.example.com',
  cdnBaseUrl: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_CDN_BASE_URL) as string | undefined,
  analyticsKey: (typeof import.meta !== 'undefined' && import.meta.env?.VITE_ANALYTICS_KEY) as string | undefined,
};