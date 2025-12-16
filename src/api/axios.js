import axios from "axios";
const api = axios.create({
baseURL: "https://reqres.in/api", // ou ton backend: "http://localhost:5000/api"
headers: {
"Content-Type": "application/json",
"x-api-key": "reqres_45507ed47b1a4b7c807d637ccd071d4a",
},
});
// Intercepteur pour ajouter le token si tu utilises l’auth
api.interceptors.request.use(
(config) => {
const token = localStorage.getItem("authToken"); // adapte à ton storage
if (token) {
config.headers.Authorization =

`Bearer ${token}`
;

}
return config;
},
(error) => Promise.reject(error)
);
// Intercepteur de réponse (gestion globale des erreurs / 401, etc.)
api.interceptors.response.use(
(response) => response,
(error) => {
if (error.response && error.response.status === 401) {
// ex: rediriger vers /login ou nettoyer le storage
// localStorage.removeItem("authToken");
}
return Promise.reject(error);
}
);
export default api;