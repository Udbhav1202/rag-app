import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use(
    (config) => {
        const auth = JSON.parse(localStorage.getItem("auth"));

        if (auth?.access_token) {
            config.headers.Authorization =
                `Bearer ${auth.access_token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

export default api;