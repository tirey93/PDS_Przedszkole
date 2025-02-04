import axios from "axios";

const { VITE_API_BASE_URL } = import.meta.env;

export const requestClient = axios.create({ baseURL: VITE_API_BASE_URL, withCredentials: true });
