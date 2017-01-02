export const ENV_NAME = 'develop';
export const ReduxDevTools = window.devToolsExtension ? window.devToolsExtension() : (f) => (f);
export const API_DOMAIN = `http://${process.env.LOCAL_HOST}:3000`;
