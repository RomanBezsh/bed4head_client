const DEFAULT_API_ORIGIN = "https://localhost:7090";
const rawOrigin = import.meta.env.VITE_BED4HEAD_API || DEFAULT_API_ORIGIN;

export const API_ORIGIN = rawOrigin.replace(/\/+$/, "");
export const API_BASE_URL = API_ORIGIN ? `${API_ORIGIN}/api` : "/api";

export const buildAssetUrl = (path) => {
    if (!path || typeof path !== "string") return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;

    const normalizedPath = path.startsWith("/") ? path : `/${path}`;
    return API_ORIGIN ? `${API_ORIGIN}${normalizedPath}` : normalizedPath;
};

