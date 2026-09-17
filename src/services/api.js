import axios from 'axios';

// Aquí apuntaremos a la URL de la HTTP API de AWS API Gateway que creará Gonzalo
// Por ahora dejamos una variable base configurable
const API_GATEWAY_URL = import.meta.env.VITE_API_URL || "https://tu-api-gateway-id.execute-api.us-east-1.amazonaws.com";

export const createApiClient = (instance, account) => {
    const api = axios.create({
        baseURL: API_GATEWAY_URL,
        headers: {
            'Content-Type': 'application/json'
        }
    });

    // Interceptor para agregar dinámicamente el Token JWT en cada request
    api.interceptors.request.use(async (config) => {
        try {
            const request = {
                scopes: ["User.Read"], // O los scopes definidos para la API de Julio
                account: account
            };
            
            // Obtener un token silencioso desde la sesión activa de MSAL
            const response = await instance.acquireTokenSilent(request);
            config.headers.Authorization = `Bearer ${response.accessToken}`;
        } catch (error) {
            console.error("Error al obtener el token de acceso de forma silenciosa:", error);
        }
        return config;
    }, (error) => {
        return Promise.reject(error);
    });

    return api;
};
