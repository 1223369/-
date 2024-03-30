import axios from "axios";
import { BASE_URL } from "@/constant";
import nProgress from "nprogress";
import { getToken,  removeToken} from "./auth";

const request = axios.create({
    baseURL: BASE_URL,
    timeout: 5000
})

// 请求拦截器
request.interceptors.request.use((config) => {
    nProgress.start();
    // 在发送请求之前做些什么
    let url = config.url as string;
    if(url.startsWith('/user') && !url.startsWith('/user/login') && !url.startsWith('/user/registered')) {
        // 添加请求头
        // @ts-ignore
        config.headers.Authorization = getToken()
    }
    return config;
}, (error) => {
    // 对请求错误做些什么
    return Promise.reject(error);
})

// 响应拦截器
request.interceptors.response.use(
    (res) => {
        nProgress.done();
        if (res.data.status === 400) {
            removeToken()
        }
        return res.data
    },
    (error) => {
        return Promise.reject(error)
    }
)

declare module 'axios' {
    export interface AxiosResponse<T = any> extends Promise<T> {}
}

export default request;