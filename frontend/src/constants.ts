export const BASE_URL = process.env.REACT_APP_API_URL || '/';

export const WS_SECURE = BASE_URL.split('//')[0] === 'https' ? 'wss' : 'ws';
export const WS_URL = `${BASE_URL.split('//')[1] || 'localhost'}/ws/chat/`;
