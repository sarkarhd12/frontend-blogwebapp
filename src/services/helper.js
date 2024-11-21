import axios from "axios"
import { getToken } from "../auth"

export const BASE_URL = 'http://localhost:8080/api/v1'

export const myAxios = axios.create({
    baseURL: BASE_URL,
})

export const privateAxios = axios.create({
    baseURL: BASE_URL,
})

// privateAxios.interceptors.request.use(config=>{
//     const token = getToken();
//     console.log(token);
//     if(token){
//         config.headers.common.Authorization = `Bearer ${token}`;
//         return config;
//     }
    
// },error=>Promise.reject(error))

privateAxios.interceptors.request.use(
    (config) => {
      const token = getToken();
      console.log(token); // Log the token for debugging purposes
  
      // Ensure config.headers exists before modifying
      if (token) {
        if (!config.headers) {
          config.headers = {}; // Initialize headers if not already defined
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
  
      return config;
    },
    (error) => Promise.reject(error) // Handle request errors
  );