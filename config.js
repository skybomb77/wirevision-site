// WireVision 配置
const CONFIG = {
    api: "https://interstaminal-unvirtuously-gennie.ngrok-free.dev/wirevision",
    auth_api: "https://interstaminal-unvirtuously-gennie.ngrok-free.dev/auth",
    name: "WireVision",
    version: "1.0.0"
};

// 自動偵測：本地 vs ngrok vs 生產
if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
    CONFIG.api = 'http://localhost:5004';
    CONFIG.auth_api = 'http://localhost:5010';
} else if (location.hostname.includes('ngrok')) {
    CONFIG.api = '';  // same-origin, no CORS
    CONFIG.auth_api = '/auth';
}

// API fetch helper — 自動帶 ngrok skip header
async function apiFetch(url, opts = {}) {
    const headers = opts.headers || {};
    headers['ngrok-skip-browser-warning'] = 'true';
    if (opts.body && typeof opts.body === 'object' && !(opts.body instanceof FormData)) {
        headers['Content-Type'] = headers['Content-Type'] || 'application/json';
        opts.body = JSON.stringify(opts.body);
    }
    const token = localStorage.getItem('kc_token');
    if (token) headers['Authorization'] = 'Bearer ' + token;
    return fetch(url, { ...opts, headers });
}
